"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
function validateData(schema) {
    return (req, res, next) => {
        try {
            if (typeof schema === "function") {
                schema(req.body).parse(req.body);
                return next();
            }
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: issue.message,
                }));
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    error: "Geçersiz veri. Lütfen kontrol edin.",
                    details: errorMessages,
                });
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        }
    };
}
