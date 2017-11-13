require "rails_helper"

RSpec.describe "user logs in", type: :system, js: true do
  context "with a valid email" do
    context "and a valid password" do
      it "redirects the user to his dashboard" do
        user = create_user(email: "user@example.com", password: "password")
        sign_in_as(email: user.email, password: "password")
        expect(page).to have_content("Signed in successfully.")
      end
    end
    context "with an invalid password" do
      it "shows the user an error" do
        user = create_user(email: "user@example.com", password: "password")
        sign_in_as(email: user.email, password: "badpassword")
        expect(page).to have_content("Invalid Email or Password")
      end
    end
  end
  context "with an invalid email" do
    it "shows the user an error" do
      sign_in_as(email: "nonexistentuser@example.com", password: "password")
      expect(page).to have_content("Invalid Email or Password")
    end
  end
  context "without filling the form" do
    it "shows the user an error" do
      sign_in_as(email: "", password: "")
      expect(page).to have_content("Invalid Email or Password")
    end
  end
end
