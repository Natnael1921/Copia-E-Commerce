import { ScaleLoader} from "react-spinners";
import "../../styles/shared/loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <ScaleLoader size={50} color="#2563eb" />
    </div>
  );
}