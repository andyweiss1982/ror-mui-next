def create_user(email:, password:)
  User.create!(email: email, password: password)
end
