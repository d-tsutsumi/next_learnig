import { getServerSideProps } from "./user-profile";

const UserIdPage = (props) => {
  return <h1>{props.id}</h1>;
};

export default UserIdPage;
