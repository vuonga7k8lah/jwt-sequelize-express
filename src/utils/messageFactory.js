class MessageFactory {
    static success(data = {}, message = "Success") {
        return {
            status: "success",
            message: message,
            data: data,
        };
    }

    static error(errorMessage = "An error occurred") {
        return {
            status: "error",
            message: errorMessage,
        };
    }

    static validationError(errors = []) {
        return {
            status: "error",
            message: "Validation errors",
            errors: errors,
        };
    }
}

module.exports = MessageFactory;
