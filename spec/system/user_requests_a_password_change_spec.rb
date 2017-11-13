require "rails_helper"

RSpec.describe "user requests a password change", type: :system, js: true do
  before(:each) do
    @user = create_user(email: "user@example.com", password: "password")
    sign_in(@user)
  end
  context "and enters his current password" do
    context "and his new password is long enough" do
      context "and his password confirmation matches his new password" do
        it "alerts the users that the change was successful" do
          visit edit_user_registration_path
          fill_in "user_password", with: "newpassword"
          fill_in "user_password_confirmation", with: "newpassword"
          fill_in "user_current_password", with: "password"
          click_button "Update account"
          expect(page).to have_content("Your account has been updated successfully.")
        end
      end
      context "but his confirmation does not match his new password" do
        it "shows the user an error" do
          visit edit_user_registration_path
          fill_in "user_password", with: "newpassword"
          fill_in "user_password_confirmation", with: "doesntmatch"
          fill_in "user_current_password", with: "password"
          click_button "Update account"
          expect(page).to have_content("doesn't match password")
        end
      end
    end
    context "but his new password is too short" do
      it "shows the user an error" do
        visit edit_user_registration_path
        fill_in "user_password", with: "short"
        fill_in "user_password_confirmation", with: "short"
        fill_in "user_current_password", with: "password"
        click_button "Update account"
        expect(page).to have_content("minimum is 6 characters")
      end
    end
  end
  context "and enters an incorrect password" do
    it "shows the user an error" do
      visit edit_user_registration_path
      fill_in "user_password", with: "newpassword"
      fill_in "user_password_confirmation", with: "newpassword"
      fill_in "user_current_password", with: "wrongpassword"
      click_button "Update account"
      expect(page).to have_content("is invalid")
    end
  end
  context "and does not enter his password" do
    it "prevents the user from submitting the form" do
      visit edit_user_registration_path
      fill_in "user_password", with: "newpassword"
      fill_in "user_password_confirmation", with: "newpassword"
      click_button "Update account"
      expect(page).to_not have_content("Your account has been updated successfully.")
    end
  end
end
