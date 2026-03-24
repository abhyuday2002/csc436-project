require "test_helper"

class PoseControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pose_index_url
    assert_response :success
  end

  test "should get show" do
    get pose_show_url
    assert_response :success
  end

  test "should get create" do
    get pose_create_url
    assert_response :success
  end
end
