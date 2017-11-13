def request_password_reset_instructions(email:)
  visit root_path
  click_button "Forgot Password?"
  fill_in "user_email", with: email
  click_button("Reset password")
end
