import { Avatar, Badge, List } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mailActions } from "../../../store/mail-slice";
import { deleteSentMail, updateSentMarkRead } from "../mailApi";

const ListItem = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    deleteSentMail(props.formattedEmail, id);
    dispatch(mailActions.deleteSentMail(id));
  };

  const clickHandler = (mail) => {
    const mailObj = { ...mail };
    mailObj.markRead = true;
    updateSentMarkRead(props.formattedEmail, mail.id, mailObj);
    dispatch(mailActions.markSentMailRead(mail.id));
    navigate(`/mail/sent/${mail.id}`);
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
        title={<a onClick={() => clickHandler(props.item)}>{props.item.to}</a>}
        description={props.item.subject}
      />
    </List.Item>
  );
};

export default ListItem;
