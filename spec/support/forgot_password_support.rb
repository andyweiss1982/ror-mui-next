def request_password_reset_instructions(email:)
  visit root_path
  click_button "Forgot Password?"
  fill_in "user_email", with: email
  click_button("Reset password")
end

def request_password_change_from_email(password:, password_confirmation:)
  sleep 1
  reset_password_param  = ActionMailer::Base
                            .deliveries.last.body.raw_source
                            .scan(/reset_password_token=..................../)
                            .first
  visit "#{edit_user_password_path}?#{reset_password_param}"
  fill_in "user_password", with: password
  fill_in "user_password_confirmation", with: password_confirmation
  click_button "Change Password"
end
