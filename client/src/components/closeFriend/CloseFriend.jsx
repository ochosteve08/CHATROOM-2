/* eslint-disable react/prop-types */
import "./closeFriend.css";

export default function CloseFriend({user}) {
  const PF = import.meta.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user)
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
