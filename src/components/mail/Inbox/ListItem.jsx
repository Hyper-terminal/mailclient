import { Avatar, Badge, List } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mailActions } from "../../../store/mail-slice";
import { deleteMail } from "../mailApi";
import { updateMarkRead } from "../mailApi";

const ListItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    deleteMail(props.formattedEmail, id);
    dispatch(mailActions.deleteMail(id));
  };

  const clickHandler = (mail) => {
    const mailObj = { ...mail };
    mailObj.markRead = true;
    updateMarkRead(props.formattedEmail, mail.id, mailObj);
    dispatch(mailActions.markInboxMailRead(mail.id));
    navigate(`/mail/inbox/${mail.id}`);
  };

  return (
    <List.Item
      actions={[
        <a onClick={() => deleteHandler(props.item.id)}>Delete</a>,
        <a onClick={() => clickHandler(props.item)}>View</a>,
      ]}
    >
      <List.Item.Meta
        style={{
          display: "flex",
          width: "20rem",
          overflow: "hidden",
        }}
        avatar={
          props.item.markRead ? (
            <Avatar />
          ) : (
            <Badge dot="show" size="large" color="blue " offset={[10, 10]}>
              <Avatar />
            </Badge>
          )
        }
        title={
          <a onClick={() => clickHandler(props.item)}>{props.item.from}</a>
        }
        description={props.item.subject}
      />
    </List.Item>
  );
};

export default ListItem;
