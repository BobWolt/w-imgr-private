(() => {
  function i(n, a, e, t, r, o, c) {
    try {
      var s = n[o](c),
        i = s.value;
    } catch (n) {
      return void e(n);
    }
    s.done ? a(i) : Promise.resolve(i).then(t, r);
  }
  function l(s) {
    return function () {
      var n = this,
        c = arguments;
      return new Promise(function (a, e) {
        var t = s.apply(n, c);
        function r(n) {
          i(t, a, e, r, o, "next", n);
        }
        function o(n) {
          i(t, a, e, r, o, "throw", n);
        }
        r(void 0);
      });
    };
  }
  $(document).ready(function () {
    var e = !1,
      n = $("div").filter(function () {
        return "none" !== $(this).css("background-image");
      }),
      r = Object.values(n);
    r.forEach(function (n) {
      var a = Math.floor(Math.random() * r.length),
        e = "btn-".concat(a),
        t = '\n        <button id="'.concat(
          e,
          '" class="splash_btn">\n          <img class="btn_icon" src="./images/edit.svg" />\n        </button>\n      '
        ),
        n = ".".concat(n.className);
      $(n).append(t), $("#".concat(e)).parent().attr("id", "img-".concat(a));
    });
    function a(n) {
      console.log("clicked", n), (e = !0);
      var a = $(n).attr("id").slice(4);
      console.log(n.parent()),
        (n =
          '\n    <div class="modal_wrapper modal_animation">\n      <div class="modal_header_wrapper">\n        <img class="w-imgr_logo" src="./images/w-imgr-logo.svg">\n        <h4 class="w-imgr_current_el">Editing: '.concat(
            n.parent()[0].className,
            '</h4>\n        <div class="w-imgr_modal_controls_wrapper">\n          <button class="close_modal_btn">Close</button>\n        </div>\n      </div>\n      <div class="form_wrapper">\n        <form id="form-image-search">\n          <input\n            class="search_bar"\n            type="text"\n            placeholder="Search for images"\n          />\n        </form>\n      </div>\n      <div class="image_container"></div>\n      <div class="more_btn_wrapper"></div>\n    </div>\n    '
          )),
        $("body").append(n),
        $(".search_bar").focus(),
        $("#form-image-search").submit(function (n) {
          n.preventDefault(),
            t($(".search_bar").val(), a),
            $(".more_btn").css("display", "flex");
        }),
        $(".more_btn_wrapper").append(
          '<button class="more_btn small_btn"><img class="btn_icon btn_icon_margin" src="./images/image.svg" />Load more</button>'
        ),
        $(".more_btn").click(function () {
          t($(".search_bar").val(), a);
        }),
        $(".close_modal_btn").click(function () {
          s();
        });
    }
    var c = -1,
      o = 1,
      t = (function () {
        var e = l(
          regeneratorRuntime.mark(function n(a, e) {
            var t;
            return regeneratorRuntime.wrap(function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    return (
                      console.log("pagenumber", o),
                      (n.next = 3),
                      fetch(
                        ""
                          .concat(
                            "https://w-imgr-proxy.herokuapp.com/",
                            "https://api.unsplash.com/search/photos?&page="
                          )
                          .concat(o, "&per_page=30&query=")
                          .concat(a, ">"),
                        { method: "GET", headers: { query: a, page: o } }
                      )
                    );
                  case 3:
                    return (t = n.sent), (n.next = 6), t.json();
                  case 6:
                    (t = n.sent),
                      console.log("response", t),
                      (function (n, t) {
                        var r = n.results,
                          o = -1;
                        r.forEach(function () {
                          c++;
                          var n = r[++o].urls.thumb,
                            a = r[o].urls.full;
                          console.log("idindex", c);
                          var e =
                            '\n      <div class="image_wrapper">\n        <div class="unsplash_image" id="unsplash-img-'
                              .concat(
                                c,
                                '"></div>\n        <div class="attribution_wrapper">\n          <h5 class="creator_name">Photo by:<a class="attribution_link" target="_blank" href="'
                              )
                              .concat(r[o].links.html, '">&nbsp')
                              .concat(
                                r[o].user.name,
                                '</a></h5>\n          <h5 class="unsplash_link">\n            <a href="https://unsplash.com" target="_blank">Unsplash</a>\n          </h5>\n        </div>\n      </div>\n      '
                              );
                          $(".image_container").append(e),
                            $("#unsplash-img-".concat(c)).css(
                              "background-image",
                              "url(".concat(n, ")")
                            ),
                            $("#unsplash-img-".concat(c)).attr(
                              "data",
                              "".concat(a)
                            );
                        }),
                          $(".unsplash_image").click(function () {
                            var e = this;
                            $(".image_wrapper_selected").removeClass(
                              "image_wrapper_selected"
                            ),
                              $(this)
                                .parent()
                                .addClass("image_wrapper_selected"),
                              l(
                                regeneratorRuntime.mark(function n() {
                                  var a;
                                  return regeneratorRuntime.wrap(function (n) {
                                    for (;;)
                                      switch ((n.prev = n.next)) {
                                        case 0:
                                          return (
                                            ((a = new Image()).src = "".concat(
                                              $(e).attr("data")
                                            )),
                                            $("#btn-".concat(t)).append(
                                              $("<div>").addClass(
                                                "w-imgr_loading_animation"
                                              )
                                            ),
                                            $("#btn-".concat(t)).append(
                                              $("<h5>Loading</h5>").addClass(
                                                "loading_text"
                                              )
                                            ),
                                            (n.next = 6),
                                            a.decode()
                                          );
                                        case 6:
                                          $(
                                            ".w-imgr_loading_animation"
                                          ).remove(),
                                            $(".loading_text").remove(),
                                            $("#img-".concat(t)).css(
                                              "background-image",
                                              "url(".concat($(e).attr("data"))
                                            ),
                                            console.log(
                                              "width: "
                                                .concat(a.width, ", height: ")
                                                .concat(a.height)
                                            );
                                        case 10:
                                        case "end":
                                          return n.stop();
                                      }
                                  }, n);
                                })
                              )();
                          }),
                          (o = -1);
                      })(t, e),
                      console.log(
                        "images amount: ",
                        $(".unsplash_image").length
                      ),
                      o++;
                  case 11:
                  case "end":
                    return n.stop();
                }
            }, n);
          })
        );
        return function (n, a) {
          return e.apply(this, arguments);
        };
      })(),
      s = function () {
        (o = 1),
          $(".modal_wrapper").removeClass("modal_animation"),
          $(".modal_wrapper").addClass("modal_animation_remove"),
          (e = !1),
          setTimeout(function () {
            $(".modal_wrapper").remove();
          }, 800);
      };
    $(".splash_btn").click(function () {
      var n = $(this);
      e
        ? (s(),
          setTimeout(function () {
            a(n);
          }, 800))
        : a(n);
    });
  });
})();
