def signup_as(email:, password:, password_confirmation:)
  visit root_path
  click_button "Sign Up"
  fill_in "user_email", with: email
  fill_in "user_password", with: password
  fill_in "user_password_confirmation", with: password_confirmation
  click_button "Sign Up"
end


