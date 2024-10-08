import Trace from '../../src/models/Trace';
import { NativeAPM } from '../../src/native/NativeAPM';

describe('Trace Model', () => {
  it('should set the id, name and attributes if passed', () => {
    const id = 'trace-id';
    const name = 'my-trace';
    const attributes = { screen: 'login' };
    const trace = new Trace(id, name, attributes);

    expect(trace.id).toBe(id);
    expect(trace.name).toBe(name);
    expect(trace.attributes).toBe(attributes);
  });

  it('should set execution trace attributes', () => {
    const attribute = { key: 'isAuthenticated', value: 'yes' };

    const trace = new Trace('trace-id');
    trace.setAttribute(attribute.key, attribute.value);

    expect(trace.attributes[attribute.key]).toBe(attribute.value);
    expect(NativeAPM.setExecutionTraceAttribute).toBeCalledTimes(1);
    expect(NativeAPM.setExecutionTraceAttribute).toBeCalledWith(
      trace.id,
      attribute.key,
      attribute.value,
    );
  });

  it('should end execution trace', () => {
    const trace = new Trace('trace-id');

    trace.end();

    expect(NativeAPM.endExecutionTrace).toBeCalledTimes(1);
    expect(NativeAPM.endExecutionTrace).toBeCalledWith(trace.id);
  });
});
