require "rails_helper"

RSpec.describe "user signs up for account", type: :system, js: true do
  context "and enters a valid email" do
    context "and the password confirmation matches the password" do
      context "and the password is long enough" do
        it "redirects the user to his dashboard" do
          sign_up_as(
            email:                  "user@example.com",
            password:               "password",
            password_confirmation:  "password"
          )
          expect(page).to have_content("Welcome! You have signed up successfully.")
        end
      end
      context "but the password is too short" do
        it "shows the user an error" do
          sign_up_as(
            email:                  "user@example.com",
            password:               "short",
            password_confirmation:  "short"
          )
          expect(page).to have_content("minimum is 6 characters")
        end
      end
    end
    context "but the password confirmation does not match the password" do
      it "shows the user an error" do
        sign_up_as(
          email:                  "user@example.com",
          password:               "password",
          password_confirmation:  "doesntmatch"
        )
        expect(page).to have_content("doesn't match password")
      end
    end
  end
  context "but leaves the email field blank" do
    it "shows the user an error" do
      sign_up_as(
        email:                  "",
        password:               "password",
        password_confirmation:  "password"
      )
      expect(page).to have_content("can't be blank")
    end
  end
  context "but enters an invalid email" do
    it "shows the user an error" do
      sign_up_as(
        email:                  "invalidemail",
        password:               "password",
        password_confirmation:  "password"
      )
      expect(page).to have_content("is invalid")
    end
  end
end
