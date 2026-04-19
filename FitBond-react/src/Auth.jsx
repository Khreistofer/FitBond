import { useState } from "react";
import { api } from "./assets/api.js";

// LOGO — swap for: import logo from "./assets/fitbond-icon.png"
const LOGO = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAEhASEDASIAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAEHAggDBQYE/8QAUBAAAQMDAQIICAoGBwcFAAAAAQACAwQFEQYHIRIXMUFRYZPREyJVcYGRlKEIFBUyQlRisdLiRVJykqLBFiM1ZGWCwiQ0RISy4fAlU1Z0g//EABwBAQACAgMBAAAAAAAAAAAAAAAGBwEFAgMECP/EADcRAAEEAAMGBAUEAQMFAAAAAAABAgMEBQYREhMhMUFRFRZSkRRCU2GhIjJxsYEHwfEjctHh8P/aAAwDAQACEQMRAD8A3LREQBERAEREAREQBERAEREAREQBERAQpREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREARec1rrC1aVpGS173OlkyIoYxl7yOXHV1leDO22l4RAsNTjP8A77F64aM8zdpjdUNVaxulUfu5ZERS30VQcdtN5BqO3YnHZTeQajt2rt8Lt+g8vmbDPqoW+iqDjspvINR27VPHZT+Qajt2p4Xb9A8zYZ9VC3kVQ8dlN5CqO3anHZTeQant2J4Xb9CjzNhn1ULeRVDx2U3kGp7dijjtpvINT27E8Lt+hR5mwz6qFvlFUHHbTeQant2Jx203kGp7dqeF2/QPM2GfVQt9Cqh47KbyDU9uxOOym8g1PbMTwu36B5mwz6qFuqVUPHZTeQantmodtlN5Bqe3anhdv0DzNhn1ULeRVDx2U/kGo7dinjrpuew1PbsTwu16DPmbDPqoW6iqLjrpvIVT2zVHHXTeQantmJ4Xa9A8zYZ9VC3kVQcdlP5Bqe2YnHZT+Qqntmp4Xa9BjzNhv1ELfRVG3bVTO/QVT2zV7LZ9q8atgqpmW+WlZTvazL3h3CJGTjHRu9a6pqM8Ldp7dEPVVxqlbk3cL9VPVIiLyG1CJhEAREQBERAEUIgJQqEQElQTgZUr5LtUx0VtqKuU4jhjc9x6ABkrLU1VEQ4SPRjFcvQ102w3Q3TXVYOFwo6TFPH1Y3u/iJ9S8gGjHIuaunkrKyermJMk8jpH+dxz/NcTdwxvVj1IkihaxOx8/YlYWzafIq81Ix1JuWSxK9B4hu5MJuUIsmNDLcgwsUyg0MjjoUbkTcs6AnAUYCIsGRgInoUlYMEbutTuUIgJ3YU5HQsd6lDJO5TgLHOOdMoZ0JICjgjoWQ3qQAVkcjDODyLY7YtQGh0LRuezgyVOZ3dfCO7+HC15o6OStrYKSIZknlbG3zuOFthaqVlHb6elibwWQxtY0dAAwFGcwzaMbGWDkWttTPn7cD7PSigKVFCzyPSinCIAiIgCIiAhSiICFKIgC8VtnuPxDQlY1rsPqcQN6+Ed/wDDlezccKlvhF3QmottrY75odO8D91v+pe7DYd7Za00mYbfw2HyO6qmhVLuXO5QAsGklZjCsIonrqQVB5NyyCgjmWTJiefKhZlYkIYIRT50WQRuQYRFgEhETJQEqEypQwECj0KeZAQU6VKY6UMkZCZRCD0Icic71mCFxJkhY1Gmp7fY/bvlDXNFluWUwdO70DA95C2OHQqd+DpQ5bcrq9nK5sDD5hl33hXGDlQbGpt5aVOxcmT6m4w5HdXLqERFqCVhEwiwAiIsgIiIAiIgCIiAxf8ANJWsm1iv+Utd3KQPJZA4U7P8g3/xcJbI3qrjoLTVVkpwyCJ0jvMBlamTzPqZ5aiU5fK90jvO45KkWXodqRz+xX+fLWzCyFOq6nCgKyLVipcVghkHKc5Kw3rEuw4JroEbqep0poq9amp5qi2fFxHE/gOMry3fjO7APSF3btkerP1ref8A93fhVl7E6D4joOje5uH1RdO7/Md38IC9wofaxuwyVzWLwQtPDMn0ZarHyou0qceJr0dkeremg7c/hWJ2Sau6aDtz+FbDoujx233Q93krDey+5rvxSau/uHbn8KcUurv7h25/CtiMBMJ47a7oY8lYb2X3Ndjsl1f/AHDtz+FOKTV/RQdufwrYnA6ETx213QeSsO7L7mu3FLq/ooO3P4VI2S6ux+j+3P4VsRgdCjA6E8dtd0HkrDuy+5rzxS6t/wAP7Y/hUjZLq3/D+3d+FbC46lKeO2u6GfJeG9l9zXnil1dyf+n9u78Knik1b/h/bu/CthUwE8dt90HkvDey+5r1xS6t/wAP7c/hTil1Z/cO3P4VsLgdCYCeO2u6DyXhvZfc14dsk1bzfJ/bn8Kw4o9XE/o/tz+FbFYHQowOcBPHLXdAmTMOTki+55XZlp6bTWloLdVcD4zwnSTFhyOETzHzY9S9U3dlMDPIpwAtTJIsjle7mpJ61dleJImckCIi4HeEREAREQBERAEREAQlFCA8JtxuXxHQtRC1xD6t7YBjoJyfcCteAd/pVp/CJuRkulutbHboY3TvHW48Fv3O9aqpvIpvgUO7rbXcprONvf4grejeBnlRhQpBW6IoODlZUtJLV1sFJEMyTSNjZ53HH80C9dsit3yjrygBZllPwqh/VwRu/iIXmtyJFC5/ZD3YZAti2yJOqmw1opGUNsp6OJuI4Y2xtHQAMBfYFIGBhRhVw5VVVVS/4mJGxGp0GQmR0riqJGxROkccBoyStebptQ1RNdKp9FXRxUnhneAb4FpwzO7f5lqcRxaGgiLL1NxheD2MTc5sPTubGJla3N2l6w57mzsG9ynjK1fzXNnYM7lqvN1LspufJeI/b3NkMjpTIWt52k6w8pt7BncseMnWHlRvYM7k83UuyjyXiH29zZL0otbeMnWHlRvYN7k4ydYeU29g3uWPN1Lso8l4h9vc2SyOlR6QtbuMnWHlNvYN7k4ytYeU2dg3uTzdT7KPJeIfb3NkcjqTI6Vrg3adrEf8fCfPTtX1U+1rVkTvHFBMOh0JH3OXNubKS89Ti7JuIpyRPc2Fz1hMql7XtnqOEG3KzBw+k6CX+Tu9e10/tJ0xdXtiNWaOZ3IypbwPfye9bKtjdKwujX8TVWsCv1U1kjXT3PaDeiwikZI0PjcHNPIQcgrNbVFRU1Q1CpoERFkBERAEREAREQBMoiAKFKICFDjgElZLr9Q1zLdZqyuk3NghdIfQCVya3aVEQ65XpGxXr0NcNqFw+Utc3OYOyyOTwDfMwYPvyvNABZzSvmlfNKcyPcXOPSSclYcysitHuoms7IfPt+dZ7L5F6qoIULJRhdx5UIDsFW98HWgLqm53R7dzWsgYfW53+lU+4Hm3rY7Yvbfk7QtEXNxJU5qHdfCO7+HgrS49PsVtnuS7JtXe30f0ae5RQ1FCS4jzG1G4/Jeh7nUtdwZHQmJh+07xR961ijZwRhXd8Ia5iO22+0tO+aUzPH2Wjd7yPUqWaqzzbY3lpI0+VC1sk1t3TdKvzL/RhyLIOwpIysSComTIyDkysM4TO5NDKIZ+hRlQHBSCMIAhU4U4WDBhgqQ1ZBSg1IwFkDuxyrHOFiXb1lFVORhUReCnp9J62vWm5WimnM1KD41NKSWEdX6p8yvfRWrrZqmg8PRP4MzMCaB5w+M93WtXzvX36bvNbYLvDcqB5EkZ8Zud0jedp6ipNg2YJqj0ZKurP6IpjuWYLjFkhTR6fk2zBUrqtL3emvtlprnSOzHOwOxztPOD1g7l2gCs+ORsjUc3kpU0jHRuVrk4oSiIuZwHoREQBERAEREBClEQBeB253H4noeaBrsPq5GwDzE5PuBXvlR/wiLn4S6262NduijdM8A87tw+4+te/DId7Zahocy2vhsPkd1XgVUDnepUbuRThWEhRhIKBQFPnQH0UFG+uroKOLe+eVsTfO44/mtsbZSx0dBBSxDDIowxo6ABgLXjY7QfKGu6PLeEymDqh3oGB7yFsgORQ/MM21MkfYtXItXYrPmXqpA60Jwslw1krYKWWZ5AaxpcT0AKNvXZbqT1EVV0Q12213M1+vJ4muyykjZCB1/OP3+5eNjORvXNeap9wu1XcH5zUTvl9ZJHuXzN5FTGIzLPZe/upfOFVkrU4406IhzKMZWAdhS1xcQGjLjuAXjY1XKiHse7Yarl6HobTojU13t8ddb7eJKeTPAeZWtzvxyFfSdmus/JbO3Z3rYPSlC22aboKEADwNOxh84G/wB67GKSOVgfG9r2nkLTkFWNBlKq6JquVddCrJ86XUlcjNNNV0Naxs21nn+ym9uzvXKzZrrE8trb27O9bI4CldqZRp91Opc6Yh9vY1wGzXWI/Rbe3Z3qDs21iBn5Kb27O9bIIs+UqXdTHnPEPt7Gr9w0bqihaX1Fkqy0c8bRJ/05XnpC6OR0bwWvacFrhgj0LcBwB3FeY1ho2y6jpXx1VM1k4H9XUMAD2Hz8/mK19zKDUaqwO49lNnRzu/aRLLOHdDWQOJRdlqex1mn71PbKwZdGcseBukYeRwXXhuVBpoXQvVjk0VCw4J2TxpJGuqKQBlZBiyAAU7l1IdiqW38Hy7FstdY5HeKR8YhB5uZw/wCk+kq4lrhshqTBr63hpwJPCRnzFpP3hbHhWrliws1FEXpwKdzXWbBiDlb83EIiKRkaCIiAIigoCUXV3O/2e2TiCvuVJTSObwg2WZrSR07yvl/pjpjy7bfaWd67EhkcmqNU8z7ldi7Lnoi/yd8hXRDWGmD+nrb7SzvWQ1bpny9bfamd6zuZPSphLtZfnT3O6ecNJWr+064fKeuLnOHZYybwDN/MwcE+8FX7dNYacht9RLHerfI5kbnBjahhLsDkAytY5nOmldM8kve4ucT0k5KkGX67kkc9yciB55vxvhZEx2uq68DizvUoQsefcpaVoZqCEU8LzLCjQuD4OtsIbc7s9nK5sDD5hwnfe31K4gq52UXfTtn0XRU9RebdFUPBlla6oYCHOOcEZ5QMD0L1R1hpcfp+2e1M71X+Ibyaw52ypd+Aur1aMbFemunc73K6TXEFwq9KXGktcYkq5oTHG0u4Pztx3nqyuM6x0xzX+2e0s71H9MNMeX7Z7UzvWvkqySMVqtXibqPEq8b0cj04fco7i01j5Lj9oYsTsz1kButkftDVerdYaX8v2v2pnep/phpby/bPaWd6jS5MrrzRxK2/6gWETRHs/wDv8lEHZprPyZH7Q1djpXZpqVmo6CW5UMcdJHO2SV3hmu3NOcY6yAFc39MNL+X7Z7UzvWB1jpYcl/tntTO9c4snwRvRyNXgdc2fZ5I1Y6RvE59YXIWbS1fXggOhgcWftY8UevCo7Zxr2s0zUClrHPqbY93jMJy6Inlc3+Y9XX6vbbq211mlWW+13Kmqn1E7RIIZQ/DG+Nvwd28BUu15JzlWVhOGsfXckreZSOZ8flivsWs/9qf4U28tVxo7nQxVtDOyeCVvCY9pyCF9WQtXtC6yuela/hwkz0Ujsz0xO532m9Dvv51sVpm/W7UFtjrrbOJY3DeORzDzhw5j1LT4hh0lR3dvcluB5ghxNmi8H9UO3yiYRa1CRABCApRZBUnwh7dEaW23QACRsjoHHpBGR/0+9U5yBXb8IapY2xW+myOG+q4WOoNPeFSQ5FVeaWtS8uz9i3cnucuHJtd1IJThKHArHeo2SpEQ9ZspaZNf2rA5JHn1Mctllr9sGonVOsnVJHiU1O52etxAHuytgQVZ+U41bS1XqpUmcpEdiGidEQIiKUkTCJhEAUHcCVK+O9VcdBa6mslOI4YnSO8wGSstTaVEQ4SPSNiuXoa57XK4XPXde7PCZTkU7f8AKN/8RK8jwG/qhc9XVPq6qWqldmSZ7pHnpLjlcSserCkcLW9kPn/ELTp7T5NeamIDegKRjPIPUmEA3L0bKHk23dzIEdA9ScLJzlYhT6FlE0OKqq8yVG5SiyYI86EKUQamOB0BMDoCywo5sLjsp2OW27uRwW84CngtH0R6lHPhDypsp2G27uZbhzD1KCR0BQT0Jzpsp2G27uMjo9yggc4HqU+hOZNlBtu7mOB0e5T61KBZRNDCqqktxhd5pHUdw01dBW2+QAHAlhcfElb0Hr6DzLokBOVwliZK1WvTVDur2JK8iSRLoqG0+jNUW7U9tFVRyYkbgSwuPjxu6D/I8673PMtTtPXuvsdyjr7dOYpmbiPovbztcOcLYzZ9qym1XaDUxMdFUQkMqIjyNd1HnBUIxPC3VHbTf2qW/lzMbcTZu5OEifk9KsXnAJWa8PtU1lBp21upaWRr7lO0iJgPzB+ueoe9R+3ZZWiWR68EJnVqyWpUijTVVKv23X1l01aKOB/CioGeDJB3cM73erAHrXhmOyN6xk4b5HSSOc97iXOc45JJ5Sg3KnL9pbU7pV6l54bSbSqshTohyghC3K484Xc6Qs9RqG+09sga4CR2ZXgbmMHKV1V4XTyJG1OKnbZnZWidK9eCFubArMaPT010laRJWyZZkfQbuHvyVZg5189vpIaGhgpKdgZFCwMaBzADC+jCuWhVSrXbEnRCi8QtuuWXzL1UlERew8YREQBeF23XH4hoSrY12H1RbTt/zHf/AAgr3Spj4Q9xD6u22tjvmB08g8/it/1L34bDvbLWmjzFa+Gw+R/20Kf6VIKzc3qWJGOZWEUXzAO5TyjCgeZSDvTUaBEypQwQpUKVkBFGDy8yciwCVHnwmQozvQaKSoO9TlMdSDQx9AUqcdSEdSAj0IpPmUE4O9NQEUZCjhJqEQzwgje9wZGxznOOGhoySegBd5o/S941PVeCt0GIWnElRJkRs9POeoK+NEaCs2mmNmDBVV+PGqZBvH7I+iPf1rU3sWirJspxcSXBss2sRVHKmyzuv+xXGgtlFVXGOu1Jw6anOC2kacSPH2j9EdQ3+ZXRbqSgtFA2mpIYqWmiG5rQGtAXxaq1PZ9N0Xxi41LWOI/q4m73vPQAqH1zry8alc+na91Hbid0DHb3D7Z5/NyedVrj2aGxcZHar0RC8srZI1RErt0Tq5T3+vtq1LRiS36ecypqd7XVHLHH5v1j7lTdZWVFdVyVdXNJPPKeE+R5yXFfHjCyBICqzEsXnvu1evDsXVhWB1sNZ/001d1XqcijCx4eOVeh0lpW8akqAygpnCHPjVEgIjb6ec9QXggrS2H7EaaqbC1bhqsV8rkRDpqCgq7jWxUVFA6aeV3BYxvP/wButbEbM9GwaVtmX8GWvnANRL/pHUF9WhtF2zS9NmJvh6x4xLUPG89Q6B1L1CsnAsASkm9l4v8A6KrzDmR2ILuouEafkBERSgiYREQBERACvKai0Dp+/XR9xuMU8k72hpImc0ADkwAV6tFzjlfGu0xdFOietFYbsSt1Q8HxUaR+rVHtD+9OKfSGP92qPaH9694i7/jrHrU8XgtD6Sex4Hil0h9WqPaH968Ttb0fpvTNiimt9PK2rnnEbC6ZxwMEk4J6verzyqL+EDchUaio7c12W00Be4faee5vvWwwueeay1quXQ0GZaVKnQe9saIvJCrxyJlZOAwscKboVCgB6FmMZWGCEzhDOmp2NkoTcbxR0DeWonZHu6CcFXqNk2kXNBdS1Gf/ALD+9VlsQoDXa4hmLcx0kT5jkc58Uffn0LYtpUSxu7IydGRu00QszJ2EV5arpZ2I7VeGp4Hil0h9WqfaH96cUukfq1R7Q/vXv0Wm+Ps+tSX+CUPpIeA4pdI/Vqj2h/eshsn0gP8Ahaj2h/ever4rxcaS1UE1bXTshgiaXOc47guuTEZ2JtOeuhyZgVFyojYk1/g8hxUaPP8AwtR7Q/vTin0h9VqPaH966TR205991863OjEFtmjc2lDh47ng5yejIzu6lawK89PG322q6ORVRD13MsVqb0ZNCiKqa8jwZ2TaQx/u1R7Q/vVO7RrXa7VqupttqjcyCna1ruE8uy8jJ3nzhbNVczIKaSZ7g1rGlxJ5gFrjZtP3rXV+q66ljMcE1Q+SSpkB4DMnOB+sQMbh7lIsItu23STP/SiEHzVhcW6ZBUiTbcvROh5KOmlnmZDBG+WV54LGMaSXHoACs/QuyOepcyu1MTFDyto2O8Z37bhyeYesKyNF6Is+mYQ6CLw9Y4YkqZQC8+boHUPevo1jq2z6YpPCV84Mzh/VwMwXv9HR1ncurFMw/pXYXZb3O/L+SEa5rrCbT16dDsaWnoLPb2wwRw0lNC3Aa0BrWgKs9dbWqenMlDp0NqJhlrqpwzGz9n9Y+7zrwOudbXfVEjo5Zfi1DnxaaN24/tHn+5eSIDTyhVLi+Z5JFVlf3L9wLJ0UbUfa0/7U/wBz77jX1NxrH1dbUSVE8hy57zk/9h1L58LhDhzFZsJKhUjnvXafxUsCOOONqNZwQktTBWfMpC6lOwxhc+GdkzWscWO4QD2hzT5weUK5dn+1ChlMVtvNPFQSbmMmiGIj5x9H7lThXG/o5lssNxSag/aZyNTiuDwYnHsyc05KbfxSNkYHscCCMgjkKzVKbENZzNqWaaucznscP9kkcckY+h3K6RyBWthuIMvQpIwp3E8Okw+wsMn/AChkiItga8IiIAielEAREQBERAYPdwWknoWrOvrkbprO6VYdwmGoMbP2WeKPuytktY3Ftp01cLgSB4Gne9vWQNw9a1R3nJOSeUnrUly7Dq90hXWfLWjI4E68QTvxlSCsVClpWehmEcFAONyzbjnWFXRNTk1FVURC6Pg72sxWq4XVzd88wibu+iwd7j6lbAXnNmduFr0RbKbGHmESP/ad4x95XpFXN6Xezud9y+sEqpVpRs+wyp5liThdTqe/0Gn7XLX3CYRxsG4fSceYAc5WvlmbE1XOXRENxHG6RyMYmqqfVe7rQ2e3S19fO2GGMZJPP1DpK142g6xrdV1hDuFDQRu/qYM/xO6T9y+HW2r7jqm4+HqC6KlYf6inB3MHSel3Wuia7KrfHcwOtqsUPBv9lpZdyw2oiT2E1f27f+zKkmloa6CtpjwZoJGyMPWDlbU6XukN6sVJcoDlk8YdjoPOD1g7lqsMK3/g/wB8x8b0/M/cP6+nBPMfnD14PpK5ZTv7qwsLl4O/s4Zzw/fV0sNTi3n/AAWtcaOGvoZqOoDjDOwskAJGWkYIyFNvo6agpY6WjgjghjbwWRsbgNC+hFZeq6aFV7Ddra04kLra2xWatqHT1dro55XfOe+FpcfSuyRcHsa9NHJqdjXuYurV0OmdpTTZ5bHbz/y7e5cbtH6YdvNhtx/5dvcu9UrpWpAvyJ7HalqdPnX3U88/RWlXDBsFu3/3dvcusuezHSNYxwbbm0jzyPp3FhHoG73L2iLg7D6zk0cxPY7WYhaYurZF91NddoWz6v0ww1tPKay3A738HD4v2gOUdYXhw/O7nW3FwpYqyjlpp2NkjkaWuaRkEHlWqWoLf8l3+vtwJLaeodG3PO3O73YVfZkweOk5JIv2qWXlTHJbzXQzcXN690PkySpAKgLMEKKaExOSkllpaqKqgeWSwvEjHDmcDkLarTtwZdLHRXBh3VELZPNkci1R4W8YWxGxSd02gaIOJPg3PYPMHnCm2TrCpK+LovEgOeayLFHN1RdD26KEVhFakoiIAiYRAEREARFCArfb/cviuko6FrsPrJ2sI+y3xj7wPWqEJ6lY3wgrmanVNNb2Pyykg4Th9p57gPWq3ByMKdYJDu6qL34lK5ttfEYi5E5N4E4TCA9akBbgjBgcgr79O0Trnf6G3N3/ABioZG7qaTv92V8bm5XvNhlq+Oa4bVOGWUkDpM4+kfFHuJ9S8d+XdQOd9jZ4PX+JuRxp1U2Ep2iOFjAMBowMLkWIGAug1rqi36YtTqysfl53RRNPjSO6B/5uVZzzshar3roh9A14HyObFGmq8j6dV6ht2nLW+ur5QANzGD5z3cwA6VrhrPUdw1PdDW1ry2NpIhgB8WMfzPSVwan1HcdSXR1dcJCeURxA+LE3oHeutBzzqs8cx59127j4MT8ls5ey2yg1JpuL1/BhwSPMpWeNyghRnUlgaSuz0zd5LJfqO6RZPgJAXgfSYdzh6srqjlBkldsEroZEkbzQ6rEDJ4nRv5Kmht1QVUVZSQ1MLg+OVge0jkIIXOVWuwa+musElomeTPQnDM8piPzfVvHoCstXPQtJartlTqhRF+o6nYfC7ooREXsPGEREATCIgIK1f2iOZLrm8yNOR8aI9QAP3LZLUFygtNmqrhUPDY4Ii89eByLVWqqZKurmq5TmSaR0j/O45P3qFZxnbumRdeZO8jwOWeSXoiaHAQQscrkKxLVXiFm6mGd4862I2HMLNAUpP05JHDzcMrXdzT0ZW0Wz2gdbdHWuleOC9lOwuH2iMn3lTHJ8arYc/shB88yolaNndT0KKFKscq8IiIAiIgCIiALCR3BYXHmCzXS63uItWlbjXcLguigcWH7WMN9+FyY1XuRqHTYkSKJz16Ia2a6uBu2r7nXA5a+oc1h+y3xR7gul5BuXM8b95yelYYVlQxpHGjU6IfPdqZZp3SL1UxCzBCxKArs1OrQ5Rv3K7fg920xWiuubhvqJhGzd9Fg73H1KjmvII51tDs3t3yXou2UjhwX+AD3j7TvGPvK0OYJtmBGJ1UmmR6m3dWVeTUPQTcPwTvBY4ePF4XJlU3qrZprDUN1kuFfd6CR7tzGDhhsbeho5lc6ghQC7QiuN2JORdNHEJqL95Dpr/BrZqrZveNOWiW6VtbROiixuYXZcScADI6142MnCuv4RdfwLXb7UwnM0xlePstHeR6lSrGkBVhjtWCrZWKFOCFt5auWbtPfWF1VV4HI13SsgcrjGUWj0JAdlYLTU3y8QWujcxs05OHP5BgZJK9wNjmoQf7Qt5/e7lx7BaeB2pKq4VMjGNp4eAzhEDxnHuHvV5fKND9bh/fCm2B4NTsVt5PzX7le5hzBdq3Fhr8kTt1Kx0Ds+1HpvU0FydW0ToOCY52NLsuYejdy5wVbOV8ouFD9bh/fCfKFD9bh/fCmNKCvTj3cbuH8kIvWrN6Xeypx/g+pF8nyjQ/XIP3wnylQfXIP3wvZv4/Uh490/0qfWi+X5SoPrkH74XzVV+stM0uqLrRxAfrTNH81hbESfMnuZSGReTV9jsju5lxyytjYXvIaAMkk8i8TfNqWmKBrm0076+UcjaduR+8dyqnWuv71qNr6cPFFRO3GGI73j7TufzBabEMwVarV0dtL2Q3eHZcu3XJ+nZb3U7TbJrdl7nFltcvDoYX5mkad0rxyAdIH3+ZV0wnCx4OFPuVaX70l2VZHlsYbh0WHwJDH/AMnICpyuMEhZNcMrwoh71O80VaHXrU9Bbw0lj5Q6TqY3e73DHpW0LIwxjWt5AMAKsdhGnDS2+S/1LODLVDgwAjeI+n0n3AK0VamWaC1au05OLuJT2asRS5dVrV/S3h/5CIikhGQiIgCIiAIiFADyKtdv1yFPpWGga7DquoaCOlrfGPvDVZLuRUBt+ufxvVUFAx3i0cG8faec/cAtlhMO9tN+3Ejmabfw2HP05rwK9zlACsAd6yBU+KRRCSFiQVnyqcLOhnXQ+rTFvdddSW+343T1DGu/Zzl3uBW2MDOBG1o3ABUJsLtQq9ZGsIyyjgc4H7TvFHu4Sv7kUKx+bbnRidC2sk1N3UWVU/cpOUQr56+dtNRy1DzhsbC4noAWhc5GtVyk3aiuVEQoHbXchcNcTRNdllHG2EdGfnH7x6l4crlule+43OqrpDl1RM+U9XCOVwtOQqXxKwtiy+Tupe+E1fhaccXZCeCMLEhZ4QheA2Gpwlo50AXIW86xxgrsSV6JoinBYo3LqqIAMcmFljzLFTkrlvpPUpx3EXpT2BGehCEymU30nqUfDxelCMBZNDQfmgehQVCwsr15qZSGNOTUOQ7+tOZYAkLIHK611OemgIBWJas+dTjIWWoqrohhXIiaqcJJHIvYbMdGT6nubZ6iNzbXA7MrsY8Kf1G/zXaaA2aVt7ljrrsySkt/KGndJMOofRHWr0tlupLdRxUlHCyGGJvBaxgwAFMcCy6+VyTWE0b27kGzDmhkbVr1V1cvNexy0sTKeBkMTQ2NgAa0DcB0LmUKVYjWo1NEKzVVVdVCIi5GAiIgCIiAIiIDGQhsbieYLVXWdb8q6pudeHcJstS8MP2G+K33ALaW4QyVFDPBFJ4KSSNzWvxngkjccdSqFuxaYDH9IAev4r+ZbrBrUNZ7nyqQ7NuH278bI67dUTmU+RgKMq4DsVmI/t9vsv51xv2J1HNqBvsn51IfGqnqIL5UxP0FShy5AferV4k6n/5A32T86g7FKvIxqBnppfzp41U9RjyniWv7Dvvg+2/wOnau5Obh1VUENPS1owPeXKzfQun0bZm6f09SWlsvhvi7OCZODjhHOScc28ruVDLc2+mc/uW3hNT4SoyFeaIQV5XazWOodA3SWPPCdD4MdXCIb/NerXx3q20l3tc9urYxJBOwse3/AM514LUbpIXMbzVDcVpGxzNe7kioai44O5ZNOCrhqtipMzvi19LY8+KHwZcB1kEZ9S4DsUqfLzPZvzKr35bxBFX9JbbM3YYrU/V+CqA5ZAq1eJWqH6dZ7N+ZBsWqgf7dZ7N+ZcPLeIeg5ebMM9f4KrUK2BsXqh+nmez/AJlPEvU+XW+zfmRMtYh6DHmzDPX+CpSFBHQFbfEvU+XWezfmQ7F6ny6z2b8yz5axD0Dzbhnr/BUeE3q3OJap8us9n/MsTsWqua+x+zfmWPLWIegz5twz1/gqU9aK3WbFZc+Pfd32af8AMvtpti9uGPjN4rZOngNa3+RXNuWL7vlODs4Ya3k5V/wUqpiD5JBHExz5DyNaMk+gLYO37KNJ0xDpqearcOeaUkH0DAXqrVYLNa28G322lp+uOMAlbGvk+d3GVyIayznmBqaQsVf5KC01s61NeHtc+k+IQHlkqdxx1N5fXhWzpDZtY7G+Oqnaa6sbv8JMPFafst5B969uAByDClSihl+pT/VpqvdSIYjmO7e4Odst7IQAA0ADAClEW+NAFClEAREQBERAEUb0QEoiIAowpRAEREAUYClEA3IERAEREAREQBRhSiAhFKIAiIgCIiAIiIAiIgCYREAREQDCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIURAR0pzoiAlERAERFgBERZAREQBERAEREAREQBERAEREAREQBERAf/Z";

// Design tokens — keep in sync with your main app
const C = {
  brand:"#05b4df", brandDark:"#0492b5", brandLight:"#e8f8fd",
  accent:"#ff6400", accentDark:"#cc5000", accentLight:"#fff2ea",
  bg:"#f4f6f8", surface:"#ffffff", border:"#e4e9ee",
  text:"#0d1117", muted:"#64748b", hint:"#94a3b8",
};

const SPORTS     = ["Running","Cycling","Swimming","Yoga","Weightlifting","Hiking","Tennis","Basketball","HIIT","Rowing"];
const FIT_LEVELS = ["Beginner","Intermediate","Advanced","Elite"];

// ─── SHARED MICRO COMPONENTS ──────────────────────────────────────

const Field = ({ label, type="text", placeholder, value, onChange, error }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
    <label style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase" }}>
      {label}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{ padding:"11px 14px", border:`1.5px solid ${error?"#ef4444":C.border}`, borderRadius:10,
        fontSize:14, fontFamily:"inherit", background:C.surface, color:C.text, outline:"none" }}
      onFocus={e=>e.target.style.borderColor=C.brand}
      onBlur={e =>e.target.style.borderColor=error?"#ef4444":C.border}
    />
    {error && <span style={{ fontSize:12, color:"#ef4444" }}>{error}</span>}
  </div>
);

const SubmitBtn = ({ children, loading }) => (
  <button type="submit" disabled={loading} style={{
    width:"100%", padding:"13px",
    background:loading?C.hint:`linear-gradient(135deg,${C.brand},${C.brandDark})`,
    color:"#fff", border:"none", borderRadius:10,
    fontSize:15, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit",
  }}
  onMouseOver={e=>{if(!loading)e.currentTarget.style.opacity=".88";}}
  onMouseOut={e=>e.currentTarget.style.opacity="1"}
  >{loading?"Please wait...":children}</button>
);

const Divider = () => (
  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
    <div style={{ flex:1, height:1, background:C.border }}/>
    <span style={{ fontSize:12, color:C.hint, fontWeight:600 }}>OR</span>
    <div style={{ flex:1, height:1, background:C.border }}/>
  </div>
);

const OAuthBtn = ({ icon, label, provider }) => (
  <button type="button"
    onClick={() => { window.location.href=`/api/auth/${provider}/redirect`; /* PLACEHOLDER */ }}
    style={{
      display:"flex", alignItems:"center", justifyContent:"center", gap:10,
      width:"100%", padding:"11px", borderRadius:10,
      border:`1.5px solid ${C.border}`, background:C.surface,
      fontSize:14, fontWeight:600, fontFamily:"inherit", color:C.text, cursor:"pointer",
    }}
    onMouseOver={e=>e.currentTarget.style.background=C.bg}
    onMouseOut={e =>e.currentTarget.style.background=C.surface}
  ><span style={{ fontSize:16 }}>{icon}</span>{label}</button>
);

const ApiError = ({ msg }) => msg
  ? <div style={{ background:"#fee2e2", color:"#b91c1c", borderRadius:10, padding:"10px 14px", fontSize:13, fontWeight:500 }}>
      &#9888; {msg}
    </div>
  : null;

// ─── HERO PANEL ───────────────────────────────────────────────────

const HeroPanel = () => (
  <div style={{
    flex:"0 0 44%", background:C.text,
    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    padding:"3rem 2.5rem", position:"relative", overflow:"hidden",
  }}>
    <div style={{ position:"absolute", top:-90,  right:-90,  width:300, height:300, borderRadius:"50%", background:`${C.brand}18` }}/>
    <div style={{ position:"absolute", bottom:-70, left:-70, width:240, height:240, borderRadius:"50%", background:`${C.accent}14` }}/>
    <div style={{ position:"absolute", top:"42%", left:-50, width:130, height:130, borderRadius:"50%", background:`${C.brand}10` }}/>

    <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"1.75rem", width:"100%" }}>

      <div style={{
        width:150, height:150, borderRadius:32,
        background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.10)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:18,
      }}>
        <img src={LOGO} alt="FitBond logo" style={{ width:"100%", height:"100%", objectFit:"contain" }}/>
      </div>

      <div style={{ textAlign:"center" }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:46, fontWeight:800, letterSpacing:"-1.5px", lineHeight:1 }}>
          <span style={{ color:C.brand }}>Fit</span><span style={{ color:C.accent }}>Bond</span>
        </div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,.32)", letterSpacing:"0.18em", marginTop:8, textTransform:"uppercase" }}>
          Sport Together
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%" }}>
        {[
          { icon:"🏃", text:"Track every workout automatically" },
          { icon:"👥", text:"Compete with friends in challenges" },
          { icon:"🏆", text:"Earn badges & climb leaderboards"  },
        ].map(f => (
          <div key={f.text} style={{
            display:"flex", alignItems:"center", gap:14,
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:12, padding:"12px 16px",
          }}>
            <span style={{ fontSize:20 }}>{f.icon}</span>
            <span style={{ fontSize:14, color:"rgba(255,255,255,.58)", fontWeight:500 }}>{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── LOGIN ────────────────────────────────────────────────────────

export const Login = ({ onLoginSuccess, onGoToSignup }) => {
  const [form,     setForm]     = useState({ email:"", password:"" });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");

  const set = field => e => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = "Email is required";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setApiError("");
    try {
      // PLACEHOLDER: POST /api/auth/login
      // Request:  { email: string, password: string }
      // Response: { token: "JWT...", user: { id, name, email, fitnessLevel, ... } }
      const res = await fetch("/api/auth/login", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email:form.email, password:form.password }),
      });
      if (!res.ok) {
        const d = await res.json().catch(()=>({}));
        throw new Error(d.message || "Invalid email or password");
      }
      const data = await res.json();
      // PLACEHOLDER: prefer httpOnly cookie (set by Spring) in production
      localStorage.setItem("fitbond_token", data.token);
      localStorage.setItem("fitbond_user",  JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch(err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <HeroPanel/>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:C.bg, padding:"2rem", overflowY:"auto" }}>
        <div style={{ width:"100%", maxWidth:420 }}>

          <div style={{ marginBottom:"2.5rem" }}>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:C.text, margin:0 }}>
              Welcome back
            </h1>
            <p style={{ fontSize:14, color:C.muted, marginTop:8 }}>Sign in to your FitBond account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            <Field label="Email"    type="email"    placeholder="you@example.com" value={form.email}    onChange={set("email")}    error={errors.email}/>
            <Field label="Password" type="password" placeholder="Your password"   value={form.password} onChange={set("password")} error={errors.password}/>
            <div style={{ textAlign:"right" }}>
              <button type="button"
                onClick={()=>{ /* PLACEHOLDER: POST /api/auth/forgot-password { email } */ }}
                style={{ background:"none", border:"none", color:C.brand, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                Forgot password?
              </button>
            </div>
            <ApiError msg={apiError}/>
            <SubmitBtn loading={loading}>Sign In</SubmitBtn>
          </form>

          <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem", marginTop:"1.5rem" }}>
            <Divider/>
            {/* PLACEHOLDER: configure Spring Security OAuth2 */}
            <OAuthBtn icon="G" label="Continue with Google" provider="google"/>
            <OAuthBtn icon="S" label="Continue with Strava" provider="strava"/>
          </div>

          <p style={{ textAlign:"center", fontSize:14, color:C.muted, marginTop:"2rem" }}>
            Don't have an account?{" "}
            <button type="button" onClick={onGoToSignup}
              style={{ background:"none", border:"none", color:C.brand, fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
              Sign up free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── SIGN UP ──────────────────────────────────────────────────────

export const Signup = ({ onSignupSuccess, onGoToLogin }) => {
  const [step,     setStep]     = useState(1);
  const [form,     setForm]     = useState({
    firstName:"", lastName:"", email:"", password:"", confirmPassword:"",
    height:"", weight:"", age:"", sex:"Male",
    fitnessLevel:"Beginner", goal:"", sports:[],
  });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");

  const set         = field => e  => setForm({ ...form, [field]: e.target.value });
  const setSex      = val   => () => setForm({ ...form, sex: val });
  const setLevel    = val   => () => setForm({ ...form, fitnessLevel: val });
  const toggleSport = s => {
    const sports = form.sports.includes(s)
      ? form.sports.filter(x=>x!==s)
      : [...form.sports, s];
    setForm({ ...form, sports });
  };

  const v1 = () => {
    const e = {};
    if (!form.firstName)  e.firstName = "Required";
    if (!form.lastName)   e.lastName  = "Required";
    if (!form.email)      e.email     = "Required";
    if (!form.password || form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirmPassword)     e.confirmPassword = "Passwords don't match";
    return e;
  };
  const v2 = () => {
    const e = {};
    if (!form.age    || form.age    < 10  || form.age    > 100) e.age    = "Valid age: 10-100";
    if (!form.height || form.height < 100 || form.height > 250) e.height = "Height in cm: 100-250";
    if (!form.weight || form.weight < 30  || form.weight > 300) e.weight = "Weight in kg: 30-300";
    if (!form.goal) e.goal = "Please set at least one goal";
    return e;
  };

  const next = e => {
    e.preventDefault();
    const errs = v1();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setStep(2);
  };

  const submit = async e => {
    e.preventDefault();
    const errs = v2();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setApiError("");
    try {
      // Step 1 — POST /api/users  →  create account, get back token + user.id
      const userRes = await api.createUser({
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        password:  form.password,
      });
      // userRes expected: { id, username, email, points, badges, token }
      const token = userRes.token;
      const user  = userRes;
      localStorage.setItem("fitbond_token", token);
      localStorage.setItem("fitbond_user",  JSON.stringify(user));

      // Step 2 — POST /api/profiles  →  create fitness profile linked to the new user
      await api.createProfile({
        userId:           user.id,
        height_cm:        Number(form.height),
        weight_kg:        Number(form.weight),
        age:              Number(form.age),
        sex:              form.sex.toUpperCase(),
        level:            form.fitnessLevel.toUpperCase(),
        goal:             form.goal,
        sportPreferences: form.sports.map(sport => sport.toUpperCase()),
      });

      onSignupSuccess(user);
    } catch(err) {
      setApiError(err.message); setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const pill = (active, onClick, label, useAccent=false) => (
    <button type="button" onClick={onClick} style={{
      padding:"7px 16px", borderRadius:20,
      border:`1.5px solid ${active?(useAccent?C.accent:C.brand):C.border}`,
      background:active?(useAccent?C.accentLight:C.brand):C.surface,
      color:active?(useAccent?C.accentDark:"#fff"):C.muted,
      fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit",
    }}>{label}</button>
  );

  const seg = (active, onClick, label) => (
    <button type="button" onClick={onClick} style={{
      flex:1, padding:"10px", borderRadius:10,
      border:`1.5px solid ${active?C.brand:C.border}`,
      background:active?C.brandLight:C.surface,
      color:active?C.brandDark:C.muted,
      fontWeight:active?700:400, fontSize:14, cursor:"pointer", fontFamily:"inherit",
    }}>{label}</button>
  );

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <HeroPanel/>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:C.bg, padding:"2rem", overflowY:"auto" }}>
        <div style={{ width:"100%", maxWidth:480, paddingTop:"1rem", paddingBottom:"2rem" }}>

          <div style={{ marginBottom:"1.75rem" }}>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:C.text, margin:0 }}>
              {step===1 ? "Create your account" : "Set up your profile"}
            </h1>
            <p style={{ fontSize:14, color:C.muted, marginTop:8 }}>
              {step===1 ? "Join thousands of athletes on FitBond" : "Help us personalise your experience"}
            </p>
            <div style={{ display:"flex", gap:8, marginTop:"1.25rem" }}>
              {[1,2].map(s=>(
                <div key={s} style={{ flex:1, height:4, borderRadius:4, background:s<=step?C.brand:C.border, transition:"background .3s" }}/>
              ))}
            </div>
            <div style={{ fontSize:11, color:C.hint, marginTop:5 }}>Step {step} of 2</div>
          </div>

          {/* ── STEP 1: Account ── */}
          {step===1 && (
            <form onSubmit={next} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                <Field label="First Name" placeholder="Alex"    value={form.firstName} onChange={set("firstName")} error={errors.firstName}/>
                <Field label="Last Name"  placeholder="Johnson" value={form.lastName}  onChange={set("lastName")}  error={errors.lastName}/>
              </div>
              <Field label="Email"            type="email"    placeholder="you@example.com"  value={form.email}           onChange={set("email")}           error={errors.email}/>
              <Field label="Password"         type="password" placeholder="Min 8 characters" value={form.password}        onChange={set("password")}        error={errors.password}/>
              <Field label="Confirm Password" type="password" placeholder="Repeat password"  value={form.confirmPassword} onChange={set("confirmPassword")} error={errors.confirmPassword}/>
              <ApiError msg={apiError}/>
              <SubmitBtn loading={false}>Continue</SubmitBtn>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                <Divider/>
                {/* PLACEHOLDER: configure Spring Security OAuth2 */}
                <OAuthBtn icon="G" label="Sign up with Google" provider="google"/>
                <OAuthBtn icon="S" label="Sign up with Strava" provider="strava"/>
              </div>
              <p style={{ textAlign:"center", fontSize:14, color:C.muted }}>
                Already have an account?{" "}
                <button type="button" onClick={onGoToLogin}
                  style={{ background:"none", border:"none", color:C.brand, fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
                  Sign in
                </button>
              </p>
            </form>
          )}

          {/* ── STEP 2: Profile ── */}
          {step===2 && (
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem" }}>
                <Field label="Height (cm)" type="number" placeholder="178" value={form.height} onChange={set("height")} error={errors.height}/>
                <Field label="Weight (kg)" type="number" placeholder="74"  value={form.weight} onChange={set("weight")} error={errors.weight}/>
                <Field label="Age"         type="number" placeholder="27"  value={form.age}    onChange={set("age")}    error={errors.age}/>
              </div>

              <div>
                <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Sex</div>
                <div style={{ display:"flex", gap:10 }}>
                  {["Male","Female","Other"].map(s=>seg(form.sex===s, setSex(s), s))}
                </div>
              </div>

              <div>
                <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Fitness Level</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {FIT_LEVELS.map(l=>pill(form.fitnessLevel===l, setLevel(l), l))}
                </div>
              </div>

              <div>
                <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>
                  Sport Preferences
                  <span style={{ fontWeight:400, textTransform:"none", letterSpacing:0, marginLeft:6, color:C.hint }}>(pick any)</span>
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {SPORTS.map(s=>pill(form.sports.includes(s), ()=>toggleSport(s), s, true))}
                </div>
              </div>

              <div>
                <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>Your First Goal</div>
                <input type="text" placeholder='e.g. "Run 50km this month"' value={form.goal} onChange={set("goal")}
                  style={{ width:"100%", padding:"11px 14px", border:`1.5px solid ${errors.goal?"#ef4444":C.border}`,
                    borderRadius:10, fontSize:14, fontFamily:"inherit", background:C.surface, color:C.text, outline:"none" }}
                  onFocus={e=>e.target.style.borderColor=C.brand}
                  onBlur={e =>e.target.style.borderColor=errors.goal?"#ef4444":C.border}
                />
                {errors.goal && <span style={{ fontSize:12, color:"#ef4444", marginTop:4, display:"block" }}>{errors.goal}</span>}
              </div>

              <ApiError msg={apiError}/>

              <div style={{ display:"flex", gap:10 }}>
                <button type="button" onClick={()=>setStep(1)} style={{
                  padding:"13px 22px", borderRadius:10, border:`1.5px solid ${C.border}`,
                  background:"transparent", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit", color:C.muted,
                }}>Back</button>
                <div style={{ flex:1 }}>
                  <SubmitBtn loading={loading}>Create Account</SubmitBtn>
                </div>
              </div>

              <p style={{ textAlign:"center", fontSize:12, color:C.hint }}>
                By signing up you agree to FitBond's Terms of Service and Privacy Policy.
                {/* PLACEHOLDER: add real links */}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};