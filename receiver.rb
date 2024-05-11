use_osc "localhost", 12004

live_loop :receive_fx do
  use_real_time
  fx = sync "/osc*/effect/value"
  set :effects, fx
  puts fx
end


live_loop :play_notes do
  
  effect = get[:effects] || ["reverb"]
  puts effect[0]
  
  with_fx effect[0] do
    play_pattern_timed chord(:C3, :maj), 0.25
    sleep 0.5
  end
  
end
