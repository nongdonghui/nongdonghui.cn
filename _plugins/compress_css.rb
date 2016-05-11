require 'yui/compressor'
require 'pathname'

module Jekyll
    class Compressor < Generator

        def get_filenames(path)
            files = Dir[path + "*"]
            filenames = []
            files.each do |file|
                filenames << String(Pathname.new(file).basename)
            end

            return filenames
        end

        # Config defaults
        PATH_TO_CSS = "./_assets/css/"
        PATH_TO_OUTPUT = "./public/css/"
        OUTPUT_FNAME = "stylesheets.css"

        def generate(site)
            # Configuration
            compressor_config = site.config['compressor'] || {}
            @config = {}
            @config['path_to_css'] = compressor_config['path_to_css'] || PATH_TO_CSS
            @config['css_filenames'] = compressor_config['css_filenames'] || get_filenames(@config['path_to_css'])
            @config['path_to_output'] = compressor_config['path_to_output'] || PATH_TO_OUTPUT
            @config['output_fname'] = compressor_config['output_fname'] || OUTPUT_FNAME

            compressor = YUI::CssCompressor.new

            combined_contents = ''

            @config['css_filenames'].each do |fname|
                combined_contents << File.open(@config['path_to_css'] + fname).read
            end

            compressed_contents = compressor.compress(combined_contents)

            output_file = File.open(@config['path_to_output'] + @config['output_fname'], 'w')
            output_file.write(compressed_contents)
        end
    end
end
