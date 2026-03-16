import { toast } from "react-toastify";

export const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2500,
  });
};

export const toastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const toastConfirm = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p style={{ marginBottom: "10px" }}>{message}</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              padding: "5px 10px",
              background: "#e74c3c",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              onConfirm();
              closeToast();
            }}
          >
            Yes
          </button>

          <button
            style={{
              padding: "5px 10px",
              background: "#ccc",
              border: "none",
              cursor: "pointer",
            }}
            onClick={closeToast}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      position: "top-center",
    }
  );
};