import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar/Navbar";
import { Rightdiv } from "./Rightdiv/Rightdiv";
import { Leftdiv } from "./Leftdiv/Leftdiv";
import loadingGif from "../src/loading.gif";

const API_URL = "https://url-shortener-dyrz.onrender.com";

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [expiryTime, setExpiryTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);

    try {
      const expiryTimestamp = expiryTime
        ? new Date(expiryTime).getTime()
        : null;
      const response = await axios.post(`${API_URL}/shorten`, {
        fullUrl: url,
        expiryTime: expiryTimestamp
          ? Math.floor((expiryTimestamp - Date.now()) / 1000)
          : null,
      });
      setShortUrl(`${API_URL}/${response.data.shortCode}`);
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Shortened URL copied!");
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3 p-3 p-lg-0">
        <div className="row">
          <div className="col-12 col-lg-7">
            <Leftdiv />
            <div className="container mt-4 mb-3">
              <input
                type="text"
                className="form-control long-url-input"
                placeholder="Paste Your Long URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="mt-4 mb-3 container">
              <label className="form-label date-time-label">
                Set Expiry Date & Time (Optional)
              </label>
              <input
                type="datetime-local"
                className="form-control date-time-input"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
              />
              <button
                className="btn get-start-btn mt-4"
                onClick={handleShorten}
                disabled={loading}
              >
                {loading ? "Shortening..." : "Shorten"}
              </button>
            </div>

            {loading && (
              <div className="text-center mt-3">
                <img src={loadingGif} alt="Loading..." width="50" />
                <p>Processing your request...</p>
              </div>
            )}

            {shortUrl && !loading && (
              <div className="my-4 ms-3">
                <p>
                  <strong>Shortened URL:</strong>
                  <input
                    type="text"
                    className="form-control long-url-input mt-3"
                    value={shortUrl}
                    readOnly
                  />
                </p>
                <button className="btn get-start-btn me-2" onClick={handleCopy}>
                  Copy Link
                </button>
                {qrCode && (
                  <>
                    <div className="d-flex mt-3 qr-div">
                      <div className="">
                        <img
                          src={qrCode}
                          alt="QR Code"
                          className="img-fluid"
                          style={{ maxWidth: "200px" }}
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center ps-3">
                        <p className="d-none d-md-inline">
                          Your link has been successfully shortened, and a QR
                          code has been generated.
                        </p>
                        <div>
                          <button
                            className="btn mt-2 get-start-btn"
                            onClick={handleDownloadQR}
                          >
                            Download QR
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="col-5 d-none d-lg-flex flex-column align-items-center justify-content-center">
            <Rightdiv />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
