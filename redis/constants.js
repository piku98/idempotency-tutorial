module.exports.errorStrings = (methodName) => {
    return `Redis ${methodName} error: `
}

module.exports.logStrings = (methodName, options) => {
    return methodName === 'set' ? 
        `Redis ${methodName}: key: ${options.key}, value: ${options.value}, expiry: ${options.expiry}` :
        `Redis ${methodName}: key: ${options.key}`
}