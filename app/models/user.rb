# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  username      :string(255)      not null
#  password_hash :string(255)      not null
#  session_token :string(255)
#  created_at    :datetime
#  updated_at    :datetime
#

class User < ActiveRecord::Base
  validates :username, :password_hash, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}
  #before_validation :ensure_session_token

  attr_reader :password

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  # def ensure_session_token
  #   self.session_token ||=
  # end

  def password=(plaintext_password)
    @password = plaintext_password
    self.password_hash = BCrypt::Password.create(plaintext_password)
  end

  def is_password?(plaintext_password)
    BCrypt::Password.new(self.password_hash).is_password?(plaintext_password)
  end

  #return our user if we can find them & pw matches, else return nil
  def self.find_by_credentials(params)
    user = User.find_by(username: params[:username])
    return user if user && user.is_password?(params[:password])
    nil
  end



end
