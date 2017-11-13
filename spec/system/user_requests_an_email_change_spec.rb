require "rails_helper"

RSpec.describe "user requests an email change", type: :system, js: true do
  before(:each) do
    @user = create_user(email: "user@example.com", password: "password")
    sign_in(@user)
  end
  context "and enters his current password" do
    it "alerts the users that the change was successful" do
      update_email(
        email: "user2@example.com",
        current_password: "password"
      )
      expect(page).to have_content("Your account has been updated successfully.")
    end
  end
  context "and enters an incorrect password" do
    it "shows the user an error" do
      update_email(
        email: "user2@example.com",
        current_password: "wrongpassword"
      )
      expect(page).to have_content("is invalid")
    end
  end
  context "and does not enter his password" do
    it "prevents the user from submitting the form" do
      update_email(
        email: "user2@example.com",
        current_password: ""
      )
      expect(page).to_not have_content("Your account has been updated successfully.")
    end
  end
end
