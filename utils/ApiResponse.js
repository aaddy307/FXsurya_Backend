class ApiResponse {
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static success(res, statusCode, data, message) {
    return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
  }

  static send(res, statusCode, data, message) {
    return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
  }
}

export default ApiResponse;
