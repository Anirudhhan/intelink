import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import  Dropzone from 'react-dropzone';



const UploadButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-amber-600 border-amber-700 hover:text-white hover:bg-amber-900 text-lg py-5 cursor-pointer"
        >
          Upload PDF
        </Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-md">

      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;