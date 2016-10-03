using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.RNInstabugReactnative
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNInstabugReactnativeModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNInstabugReactnativeModule"/>.
        /// </summary>
        internal RNInstabugReactnativeModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNInstabugReactnative";
            }
        }
    }
}
