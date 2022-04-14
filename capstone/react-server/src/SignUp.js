import React from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import { signup } from "./service/ApiService";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email"); //처리
    const password = data.get("password");
    const age = data.get("age");
    const gender = data.get("gender");
    signup({ email: email, username: username, password: password, age: age, gender: gender }).then( //처리
      (response) => {
        // 계정 생성 성공 시 login페이지로 리디렉트
        window.location.href = "/login";
      }
    );
  }

  render() {
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                계정 생성
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="유저 이름"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email" //처리
                label="이메일 주소"
                name="email" //처리
                autoComplete="email" //처리
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="패스워드"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="age"
                label="나이"
                name="age"
                autoComplete="age"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="gender"
                label="성별"
                name="gender"
                autoComplete="gender"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                계정 생성
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                이미 계정이 있습니까? 로그인 하세요.
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default SignUp;
