from mitmproxy import http, ctx
import json
import os
from datetime import datetime

# Configuration
TARGET_HOST = "instabug.com"
ORIGINAL_DOMAIN = "api.instabug.com"
NEW_DOMAIN = os.getenv('Domain')
TARGET_TOKEN = os.getenv('Key')
ALL_REQUESTS_FILE = "InterceptedRequests.json"
CAPTURED_RESPONSE_FILE = "captured_response.json" 

def save_to_json(data, filename):
    try:
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                existing_data = json.load(f)
        else:
            existing_data = []
        
        existing_data.append(data)
        
        with open(filename, 'w') as f:
            json.dump(existing_data, f, indent=2)
    except Exception as e:
        ctx.log.error(f"Error saving to {filename}: {str(e)}")

def save_captured_response(response_body):
    try:
        if isinstance(response_body, str):
            response_json = json.loads(response_body)
        else:
            response_json = json.loads(response_body.decode('utf-8'))
            
        with open(CAPTURED_RESPONSE_FILE, 'w') as f:
            json.dump(response_json, f, indent=2)
            
    except Exception as e:
        ctx.log.error(f"Error saving captured response: {str(e)}")

def should_intercept(url: str) -> bool:
    return TARGET_HOST in url

def request(flow: http.HTTPFlow) -> None:
    original_url = flow.request.pretty_url
    
    if not should_intercept(original_url):
        return
    
    ctx.log.info(f"Intercepted request: {original_url}")
    
    if ORIGINAL_DOMAIN in original_url and "/api/sdk/v3/features" in original_url:
        flow.metadata['original_url'] = original_url
        flow.metadata['original_host'] = flow.request.host
        flow.metadata['original_headers'] = dict(flow.request.headers)
        
        ctx.log.info(f"Modifying request to go to new domain first")
        new_url = original_url.replace(ORIGINAL_DOMAIN, NEW_DOMAIN)
        new_url = new_url.split('application_token=')[0] + f'application_token={TARGET_TOKEN}'
        flow.request.url = new_url
        flow.request.host = NEW_DOMAIN
        flow.request.headers["host"] = NEW_DOMAIN
    
    timestamp = datetime.now().isoformat()
    request_data = {
        "timestamp": timestamp,
        "method": flow.request.method,
        "url": original_url,
        "headers": dict(flow.request.headers),
        "body": flow.request.get_text() if flow.request.get_text() else None
    }
    save_to_json(request_data, ALL_REQUESTS_FILE)

def response(flow: http.HTTPFlow) -> None:
    if not should_intercept(flow.request.pretty_url):
        return
    
    if NEW_DOMAIN in flow.request.pretty_url and hasattr(flow, 'metadata'):
        try:
            timestamp = datetime.now().isoformat()
            captured_response = {
                'status_code': flow.response.status_code,
                'headers': dict(flow.response.headers),
                'content': flow.response.get_text()
            }
            
            response_body = flow.response.get_text()
            save_captured_response(response_body)
            
            flow.metadata['captured_response'] = captured_response
            
            ctx.log.info("Restoring original request details")
            flow.request.url = flow.metadata['original_url']
            flow.request.host = flow.metadata['original_host']
            flow.request.headers.update(flow.metadata['original_headers'])
        except json.JSONDecodeError:
            ctx.log.error(f"Error: Response is not valid JSON for URL: {flow.request.pretty_url}")
        except Exception as e:
            ctx.log.error(f"Error processing response: {str(e)}")
    
    timestamp = datetime.now().isoformat()
    request_response_data = {
        "timestamp": timestamp,
        "request": {
            "method": flow.request.method,
            "url": flow.request.pretty_url,
            "headers": dict(flow.request.headers),
            "body": flow.request.get_text() if flow.request.get_text() else None
        },
        "response": {
            "status_code": flow.response.status_code,
            "headers": dict(flow.response.headers),
            "body": flow.response.get_text() if flow.response.get_text() else None
        }
    }
    save_to_json(flow.response, ALL_REQUESTS_FILE)