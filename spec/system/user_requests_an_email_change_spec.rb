require "rails_helper"

RSpec.describe "user requests an email change", type: :system, js: true do
  before(:each) do
    @user = create_user(email: "user@example.com", password: "password")
    sign_in(@user)
  end
  context "and enters his current password" do
    it "alerts the users that the change was successful" do
      visit edit_user_registration_path
      fill_in "user_email", with: "user2@example.com"
      fill_in "user_current_password", with: "password"
      click_button "Update account"
      expect(page).to have_content("Your account has been updated successfully.")
    end
  end
  context "and enters an incorrect password" do
    it "shows the user an error" do
      visit edit_user_registration_path
      fill_in "user_email", with: "user2@example.com"
      fill_in "user_current_password", with: "wrongpassword"
      click_button "Update account"
      expect(page).to have_content("is invalid")
    end
  end
  context "and does not enter his password" do
    it "prevents the user from submitting the form" do
      visit edit_user_registration_path
      fill_in "user_email", with: "user2@example.com"
      click_button "Update account"
      expect(page).to_not have_content("Your account has been updated successfully.")
    end
  end
end
