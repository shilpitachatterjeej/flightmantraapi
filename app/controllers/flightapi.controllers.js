const axios = require('axios');
const ResponseFormat = {
    successResponse: (res, result, code, message, paginationInfo, otherInfo) => {
        return res.status(code).json({
            data: result,
            message: message,
            statusCode: code,
            statusType: "success",
            paginationInfo: paginationInfo,
            otherInfo: otherInfo
        });
    },
    errorResponse: (res, code, message, err = "{}") => {
        return res.status(code).json({
            error: err,
            message: message,
            statusCode: code,
            statusType: "error"
        });
    },
    requiredResponse: (res, columnName) => {
        return res.status(400).json({
            error: "{}",
            message: columnName + " is required",
            statusCode: 400,
            statusType: "error"
        });
    },
}
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;

const authenticationApi = async (req, res) => {
    try {
        const reqBody = req.body;

        if (!reqBody.ClientId) {
            return requiredResponse(res, "ClientId");
        }
        if (!reqBody.UserName) {
            return requiredResponse(res, "UserName");
        }
        if (!reqBody.Password) {
            return requiredResponse(res, "Password");
        }
        if (!reqBody.EndUserIp) {
            return requiredResponse(res, "EndUserIp");
        }

        // Replace with the actual API endpoint
    const url = 'http://api.tektravels.com/SharedServices/SharedData.svc/rest/Authenticate';

    // Data to be sent in the POST request
    const data = {
      ClientId: reqBody.ClientId,
      UserName: reqBody.UserName,
      Password: reqBody.Password,
      EndUserIp: reqBody.EndUserIp
    };

    // Send POST request using axios
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Handle the response
    console.log('Success:', response.data);
    res.status(200).json(response.data);
    } catch (error) {
        // Handle the error
    console.error('Error:', error.message || error.response.data);
    res.status(500).json({ error: 'Failed to authenticate' });
    }
};

module.exports = {
    authenticationApi



}


