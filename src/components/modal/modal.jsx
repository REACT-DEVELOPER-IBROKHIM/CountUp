import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";


const Modal = ({ title, description, children, open, setOpen, size}) => {

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent style={{ width: size }}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
