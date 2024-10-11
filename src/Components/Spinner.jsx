import { LoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Spinner;
