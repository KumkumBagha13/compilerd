# execute.rb
code = ARGV[0]
File.write('temp.rb', code)
result = `ruby temp.rb`
puts result
