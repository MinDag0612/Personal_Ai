import "./Notification.css";

function BaseNotification({ title = "Thông báo", message, type = "info", onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`app-toast app-toast-${type}`} role="status" aria-live="polite">
      <div className="app-toast-content">
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      <button className="app-toast-close" type="button" onClick={onClose} aria-label="Đóng thông báo">
        x
      </button>
    </div>
  );
}

function InfoNotification(props) {
  return <BaseNotification title="Thông báo" type="info" {...props} />;
}

function WarningNotification(props) {
  return <BaseNotification title="Cảnh báo" type="warning" {...props} />;
}

function ErrorNotification(props) {
  return <BaseNotification title="Lỗi" type="error" {...props} />;
}

function SuccessNotification(props) {
  return <BaseNotification title="Thành công" type="success" {...props} />;
}

const Notification = {
  Base: BaseNotification,
  Info: InfoNotification,
  Warning: WarningNotification,
  Error: ErrorNotification,
  Success: SuccessNotification,
};

export default Notification;
