require 'sinatra'
require 'sinatra-websocket'

set :server, 'thin'
set :sockets, []

set :public_folder, -> { root }

get '/' do
  if !request.websocket?
    redirect '/test.html'
  else
    str = (0...256).map { |b| '' << b }.join("")
    request.websocket do |ws|
      ws.onopen do
        str.bytes.each.with_index do |byte, index|
          ws.send("#{index},#{byte}")
        end
      end
    end
  end
end
