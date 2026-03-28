class ExpressError extends Error {
  constructor(status, message) {
    super(message);        // ✅ message Error class ko pass
    this.status = status;
  }
}

module.exports = ExpressError;