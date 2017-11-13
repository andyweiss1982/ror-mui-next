require "rails_helper"

RSpec.describe "user requests a password change", type: :system, js: true do
  context "from the My Account panel" do
    before(:each) do
      @user = create_user(email: "user@example.com", password: "password")
      sign_in(@user)
    end
    context "and enters his current password" do
      context "and his new password is long enough" do
        context "and his password confirmation matches his new password" do
          it "alerts the users that the change was successful" do
            update_password_from_my_account(
              password:               "newpassword",
              password_confirmation:  "newpassword",
              current_password:       "password"
            )
            expect(page).to have_content("Your account has been updated successfully.")
          end
        end
        context "but his confirmation does not match his new password" do
          it "shows the user an error" do
            update_password_from_my_account(
              password:               "newpassword",
              password_confirmation:  "doesntmatch",
              current_password:       "password"
            )
            expect(page).to have_content("doesn't match password")
          end
        end
      end
      context "but his new password is too short" do
        it "shows the user an error" do
          update_password_from_my_account(
            password:               "short",
            password_confirmation:  "short",
            current_password:       "password"
          )
          expect(page).to have_content("minimum is 6 characters")
        end
      end
    end
    context "and enters an incorrect password" do
      it "shows the user an error" do
        update_password_from_my_account(
          password:               "newpassword",
          password_confirmation:  "newpassword",
          current_password:       "wrongpassword"
        )
        expect(page).to have_content("is invalid")
      end
    end
    context "and does not enter his password" do
      it "prevents the user from submitting the form" do
        update_password_from_my_account(
          password:               "newpassword",
          password_confirmation:  "newpassword",
          current_password:       ""
        )
        expect(page).to_not have_content("Your account has been updated successfully.")
      end
    end
  end
  context "from a password reset email" do
    context "and the correct reset_password_token is present" do
      context "and the password is long enough" do
        context "and the password_confirmation matches" do
          it "alerts the user that the reqest was successful" do
            user = create_user(email: "user@example.com", password: "password")
            request_password_reset_instructions(email: user.email)
            request_password_change_from_email(
              password:               "newpassword",
              password_confirmation:  "newpassword"
            )
            expect(page).to have_content("Your password has been changed successfully.")
          end
        end
        context "but the password_confirmation does not match" do
          it "shows the user an error" do
            user = create_user(email: "user@example.com", password: "password")
            request_password_reset_instructions(email: user.email)
            request_password_change_from_email(
              password:               "newpassword",
              password_confirmation:  "doesntmatch"
            )
            expect(page).to have_content("doesn't match password")
          end
        end
      end
      context "but the password is too short" do
        it "shows the user an error" do
          user = create_user(email: "user@example.com", password: "password")
          request_password_reset_instructions(email: user.email)
          request_password_change_from_email(
            password:               "short",
            password_confirmation:  "short"
          )
          expect(page).to have_content("minimum is 6 characters")
        end
      end
    end
    context "but an invalid reset_password_token is present" do
      it "does not change the user's passwod" do
        visit "#{edit_user_password_path}?reset_password_token=incorrect"
        fill_in "user_password", with: "newpassword"
        fill_in "user_password_confirmation", with: "newpassword"
        click_button "Change Password"
        expect(page).to_not have_content("Your password has been changed successfully.")
      end
    end
    context "but no reset_password_token is present" do
      it "shows the user an error" do
        visit edit_user_password_path
        expect(page).to have_content("You can't access this page without coming from a password reset email.")
      end
    end
  end
end
