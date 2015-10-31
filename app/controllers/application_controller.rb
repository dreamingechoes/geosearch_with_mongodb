class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
    @shops = Shop.all
  end

  def search_shops
    address_coordinates = Geocoder.coordinates(params[:query])
    shops = Shop.near(address_coordinates, params[:distance], units: :km)
                .only(:description, :coordinates)
                .limit(params[:limit])
                
    render json: { response: shops }
  end
end
