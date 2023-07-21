import { forwardRef } from "react";
import "./FormTextarea.css";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FormElement from '../FormElement/FormElement';

const FormTextarea = forwardRef((props, ref) => {
  const icons = {
    bio: <HistoryEduIcon className="form-group__icon" />,
  };

  return (
    <FormElement icon={icons[props.label.toLowerCase()]} {...props} ref={ref} />
  );
});

export default FormTextarea;
