import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./auth-context";
const Home = () => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoggedIn } = AuthCtx;

  const logoutHandler = () => {
    AuthCtx.logout();
  };

  const loginHandler = () => {
    history.push("/login1");
  };

  const signupHandler = () => {
    history.push("/signup1");
  };

  return (
    <div>
      <h1>홈 화면</h1>
      {isLoggedIn ? (
        <div>
          <p>로그인 상태</p>
          <button onClick={logoutHandler}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인 상태가 아닙니다.</p>
          <button onClick={loginHandler}>로그인</button>
          <button onClick={signupHandler}>회원가입</button>
        </div>
      )}
    </div>
  );
};

export default Home;
