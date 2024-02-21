import styled from "@emotion/styled";
import { Avatar, List, Radio } from "@mui/material";
import { orange } from "@mui/material/colors";




export const HomeAvatar = styled(Avatar)({
    width: 70,
    height: 70,
    position: 'absolute',
    top: 30, 
    right: 30,
    cursor: 'pointer',
});



export const OrangeRadio = styled(Radio)({
    color: orange[500],
    "&$checked": {
        color: orange[700],
        background: orange[700],
    }
});




export const HomeList = styled(List)({
    width: '100%',
     maxWidth: 1000,
      bgcolor: 'background.paper',
});