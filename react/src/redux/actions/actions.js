
function convertActionNameToType(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}
export  const actionsStore = new Proxy(
    {},
    {
        get: function (target, prop) {
            if (target[prop] === undefined) {
                
                return function (args) {
                    return {
                        type: convertActionNameToType(prop),
                        payload: args
                    };
                };
            }
            else
                return target[prop]
        }
    }
)
