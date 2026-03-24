class PoseController < ApplicationController
  def index
    @poses = Pose.all
    render json: @poses
  end

  def show
  end

  def create
    @pose = Pose.new(pose_params)
    if @pose.save
      render json: @pose, status: :created
    else
      render json: @pose.errors, status: :unprocessable_entity
    end
  end

  private

  def pose_params
    params.require(:name, :difficulty, :position, :bend).permit(:image, :variations)
  end
end
