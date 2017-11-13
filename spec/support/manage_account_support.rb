def create_user(email:, password:)
  User.create!(email: email, password: password)
end

def update_email(email:, current_password:)
  visit edit_user_registration_path
  fill_in "user_email", with: email
  fill_in "user_current_password", with: current_password
  click_button "Update account"
end

def update_password(password:, password_confirmation:, current_password:)
  visit edit_user_registration_path
  fill_in "user_password", with: password
  fill_in "user_password_confirmation", with: password_confirmation
  fill_in "user_current_password", with: current_password
  click_button "Update account"
end
