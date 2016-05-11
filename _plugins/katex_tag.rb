# Simple tag to produce fancy KaTeX symbol when you use the {% katex %} tag
# It's just out of laziness really

module Jekyll
    class KatexTag < Liquid::Tag

        def initialize(tag_name, text, tokens)
            super
        end

        def render(context)
            '<span class="katex"><span class="katex-inner"><span class="strut" style="height:0.68333em;"></span><span class="strut bottom" style="height:1.0302031249999999em;vertical-align:-0.34687312499999995em;"></span><span class="base textstyle uncramped"><span class="katex-logo"><span class="k">K</span><span class="a">A</span><span class="t">T</span><span class="e">E</span><span class="x">X</span></span></span></span></span>'
        end
    end
end

Liquid::Template.register_tag('katex', Jekyll::KatexTag)
