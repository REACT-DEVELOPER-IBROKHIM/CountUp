import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const Modal = ({ title, description, children, open, setOpen, size}) => {
  console.log(size);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className={size ? `max-w-[${size}]` : ""}>
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
