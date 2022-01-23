export const usernameValidator = (rule, value, callback) => {
  const name = value.trim();
  if (name === "") {
    callback(new Error("用户名不能为空"));
  } else {
    callback();
  }
};
export const passwordValidator = (rule, value, callback) => {
  const pwd = value;
  var patrn =
    /^(?![\d]+$)(?![a-zA-Z]+$)(?![!@#$%^&*()_+-=]+$)[\da-zA-Z!@#$%^&*()_+-=]{6,20}$/;
  if (!patrn.exec(pwd)) {
    callback(
      new Error(
        "密码必须是由数字、字母、特殊字符（!@#$%^&*()_+-=）中至少两种及以上组合而成的6-20位字符"
      )
    );
  } else {
    callback();
  }
};
