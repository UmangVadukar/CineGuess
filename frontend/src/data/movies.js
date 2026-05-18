import { resolveSceneImage, tmdbImage } from '../utils/tmdbImages.js'

/**
 * @typedef {Object} Movie
 * @property {string} id
 * @property {number} tmdbId
 * @property {string} title
 * @property {string[]} aliases
 * @property {string} genre
 * @property {string} actor
 * @property {number} year
 * @property {number} rating
 * @property {string} posterPath
 * @property {string} backdropPath - TMDB still (fallback)
 * @property {string} [sceneUrl] - full URL to iconic scene still
 * @property {string} poster
 * @property {string} scene
 */

/** @type {Omit<Movie, 'poster' | 'scene'>[]} */
const MOVIE_DATA = [
  {
    id: 'inception',
    tmdbId: 27205,
    title: 'Inception',
    aliases: ['inception 2010'],
    genre: 'Sci-Fi / Thriller',
    actor: 'Leonardo DiCaprio',
    year: 2010,
    rating: 8.8,
    posterPath: '/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
    backdropPath: '/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    sceneUrl:
      'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/audio/video/2010/7/13/1279026254551/Still-from-Christopher-No-010.jpg?width=1280&dpr=1&s=none&crop=none',
  },
  {
    id: 'dark-knight',
    tmdbId: 155,
    title: 'The Dark Knight',
    aliases: ['dark knight', 'batman dark knight', 'the dark knight 2008'],
    genre: 'Action / Crime',
    actor: 'Heath Ledger',
    year: 2008,
    rating: 9.0,
    posterPath: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdropPath: '/cfT29Im5VDvjE0RpyKOSdCKZal7.jpg',
    sceneUrl:
    'https://cdn.mos.cms.futurecdn.net/RBF6E4GXEQwhZJFm8MGNGi.jpg'
  },
  {
    id: 'interstellar',
    tmdbId: 157336,
    title: 'Interstellar',
    aliases: ['interstellar 2014'],
    genre: 'Sci-Fi / Adventure',
    actor: 'Matthew McConaughey',
    year: 2014,
    rating: 8.7,
    posterPath: '/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
    backdropPath: '/2ssWTSVklAEc98frZUQhgtGHx7s.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXvAL6lp94BLw0b4lri5MiZmJauoTPPBg09g&s'
  },
  {
    id: 'matrix',
    tmdbId: 603,
    title: 'The Matrix',
    aliases: ['matrix', 'the matrix 1999'],
    genre: 'Sci-Fi / Action',
    actor: 'Keanu Reeves',
    year: 1999,
    rating: 8.7,
    posterPath: '/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg',
    backdropPath: '/tlm8UkiQsitc8rSuIAscQDCnP8d.jpg',
    sceneUrl:
    'https://www.syfy.com/sites/syfy/files/2019/03/the_matrix_0.jpg'
  },
  {
    id: 'pulp-fiction',
    tmdbId: 680,
    title: 'Pulp Fiction',
    aliases: ['pulp fiction 1994'],
    genre: 'Crime / Drama',
    actor: 'John Travolta',
    year: 1994,
    rating: 8.9,
    posterPath: '/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
    backdropPath: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    sceneUrl:
    'https://bestclassicbands.com/wp-content/uploads/2015/11/Pulp-Fiction-Dance-Scene.jpg'
  },
  {
    id: 'fight-club',
    tmdbId: 550,
    title: 'Fight Club',
    aliases: ['fightclub'],
    genre: 'Drama / Thriller',
    actor: 'Brad Pitt',
    year: 1999,
    rating: 8.8,
    posterPath: '/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg',
    backdropPath: '/xRyINp9KfMLVjRiO5nCsoRDdvvF.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuamCjRS4WQTOljOWKN8DyTfNMz07-6Swhrg&s'
  },
  {
    id: 'godfather',
    tmdbId: 238,
    title: 'The Godfather',
    aliases: ['godfather', 'the godfather 1972'],
    genre: 'Crime / Drama',
    actor: 'Marlon Brando',
    year: 1972,
    rating: 9.2,
    posterPath: '/wWJbBo5yjw22AIjE8isBFoiBI3S.jpg',
    backdropPath: '/tSPT36ZKlP2WVHJLM4cQPLSzv3b.jpg',
    sceneUrl:
    'https://www.indiewire.com/wp-content/uploads/2017/04/the-godfather-part-ii.jpg'
  },
  {
    id: 'shawshank',
    tmdbId: 278,
    title: 'The Shawshank Redemption',
    aliases: ['shawshank redemption', 'shawshank'],
    genre: 'Drama',
    actor: 'Tim Robbins',
    year: 1994,
    rating: 9.3,
    posterPath: '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
    backdropPath: '/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
    sceneUrl:
    'https://justkillingti.me/wp-content/2014/05/andy-escape.jpg'
  },
  {
    id: 'forrest-gump',
    tmdbId: 13,
    title: 'Forrest Gump',
    aliases: ['forrest gump 1994'],
    genre: 'Drama / Romance',
    actor: 'Tom Hanks',
    year: 1994,
    rating: 8.8,
    posterPath: '/Cw4hIUIAmSYfK9QfaUW5igp9La.jpg',
    backdropPath: '/66Kn4XWhkuPkJxOJyPEx4U2CUfN.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPiIH3HCCrjkHIsSScyj12EwFcUaQwcWdfg&s'
  },
  {
    id: 'parasite',
    tmdbId: 496243,
    title: 'Parasite',
    aliases: ['parasite 2019', 'gisaengchung'],
    genre: 'Thriller / Drama',
    actor: 'Song Kang-ho',
    year: 2019,
    rating: 8.5,
    posterPath: '/igICOruFgiqdY1HXwTNRuXJute.jpg',
    backdropPath: '/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
    sceneUrl:
    'https://media.gq.com/photos/5dc05c36e0381b0008e7a877/16:9/w_2560%2Cc_limit/Parasite-Cannes-8.jpg'
  },
  {
    id: 'joker',
    tmdbId: 475557,
    title: 'Joker',
    aliases: ['joker 2019'],
    genre: 'Crime / Thriller',
    actor: 'Joaquin Phoenix',
    year: 2019,
    rating: 8.4,
    posterPath: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    backdropPath: '/hO7KbdvGOtDdeg0W4Y5nKEHeDDh.jpg',
    sceneUrl:
    'https://www.journal-topics.com/wp-content/uploads/2019/10/joker.jpg'
  },
  {
    id: 'oppenheimer',
    tmdbId: 872585,
    title: 'Oppenheimer',
    aliases: ['oppenheimer 2023'],
    genre: 'Biography / Drama',
    actor: 'Cillian Murphy',
    year: 2023,
    rating: 8.3,
    posterPath: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdropPath: '/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg',
    sceneUrl:
    'https://fwmedia.fandomwire.com/wp-content/uploads/2024/05/27111304/oppie0-1024x576.jpg'
  },
  {
    id: 'dune',
    tmdbId: 438631,
    title: 'Dune',
    aliases: ['dune 2021', 'dune part one'],
    genre: 'Sci-Fi / Adventure',
    actor: 'Timothée Chalamet',
    year: 2021,
    rating: 8.0,
    posterPath: '/pc15b0pi8o1oUv9vNhakwMQ9TxA.jpg',
    backdropPath: '/zRKQW58MBEY078AxkHxEJzUskCl.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTcdaa1s9W7GiMgCyQGE_sUWY9JjOzpoJoXg&s'
  },
  {
    id: 'avatar',
    tmdbId: 19995,
    title: 'Avatar',
    aliases: ['avatar 2009'],
    genre: 'Sci-Fi / Adventure',
    actor: 'Sam Worthington',
    year: 2009,
    rating: 7.9,
    posterPath: '/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg',
    backdropPath: '/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg',
    sceneUrl:
    'https://www.slashfilm.com/img/gallery/the-10-best-moments-in-avatar-the-way-of-water/an-underwater-seizure-1671230908.jpg'
  },
  {
    id: 'titanic',
    tmdbId: 597,
    title: 'Titanic',
    aliases: ['titanic 1997'],
    genre: 'Romance / Drama',
    actor: 'Leonardo DiCaprio',
    year: 1997,
    rating: 7.9,
    posterPath: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    backdropPath: '/xnHVX37XZEp33hhCbYlQFq7ux1J.jpg',
    sceneUrl:
    'https://media.vanityfair.com/photos/58fe1c3fba08f274de5284ba/master/w_2560%2Cc_limit/titanic-james-cameron.jpg'
  },
  {
    id: 'gladiator',
    tmdbId: 98,
    title: 'Gladiator',
    aliases: ['gladiator 2000'],
    genre: 'Action / Drama',
    actor: 'Russell Crowe',
    year: 2000,
    rating: 8.5,
    posterPath: '/wN2xWp1eIwCKOD0BHTcErTBv1Uq.jpg',
    backdropPath: '/jhk6D8pim3yaByu1801kMoxXFaX.jpg',
    sceneUrl:
    'https://www.looper.com/img/gallery/the-ending-of-gladiator-explained/maximus-achieves-his-noble-goals-at-the-end-of-gladiator-1619986451.jpg'
  },
  {
    id: 'lotr-fellowship',
    tmdbId: 120,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    aliases: ['lord of the rings', 'fellowship of the ring', 'lotr'],
    genre: 'Fantasy / Adventure',
    actor: 'Elijah Wood',
    year: 2001,
    rating: 8.9,
    posterPath: '/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    backdropPath: '/a0lfia8tk8ifkrve0Tn8wkISUvs.jpg',
    sceneUrl:
    'https://i.guim.co.uk/img/media/88a2e28991ea980d42de80fd7a73f6f035228870/0_17_2000_1200/master/2000.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=8f65ebe54832ab07ac71c5ef488c612b'
  },
  {
    id: 'harry-potter',
    tmdbId: 671,
    title: "Harry Potter and the Philosopher's Stone",
    aliases: ['harry potter', 'sorcerers stone', 'philosophers stone'],
    genre: 'Fantasy / Adventure',
    actor: 'Daniel Radcliffe',
    year: 2001,
    rating: 7.6,
    posterPath: '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
    backdropPath: '/1XAC6RPT01UX9EQGy2JVn5c8pgy.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxoXUWShC3pTx0MBo7kDdfXBQzcB0JTq90Q&s'
  },
  {
    id: 'jurassic-park',
    tmdbId: 329,
    title: 'Jurassic Park',
    aliases: ['jurassic park 1993'],
    genre: 'Adventure / Sci-Fi',
    actor: 'Sam Neill',
    year: 1993,
    rating: 8.2,
    posterPath: '/4vaXzwsRtyRA7cGNFevFA2pTocv.jpg',
    backdropPath: '/jzt9HuhIAdH9qp0K2MA1m5V8sgq.jpg',
    sceneUrl:
    'https://www.slashfilm.com/img/gallery/the-10-greatest-jurassic-park-moments/l-intro-1654780777.jpg'
  },
  {
    id: 'silence-of-the-lambs',
    tmdbId: 274,
    title: 'The Silence of the Lambs',
    aliases: ['silence of the lambs'],
    genre: 'Crime / Thriller',
    actor: 'Jodie Foster',
    year: 1991,
    rating: 8.6,
    posterPath: '/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg',
    backdropPath: '/aYcnDyLMnpKce1FOYUpZrXtgUye.jpg',
    sceneUrl:
    'https://cdn.mos.cms.futurecdn.net/y3bnuZwttTfjjXUK9HPYoW.jpg'
  },
  {
    id: 'se7en',
    tmdbId: 807,
    title: 'Se7en',
    aliases: ['seven', 'se7en 1995'],
    genre: 'Crime / Thriller',
    actor: 'Brad Pitt',
    year: 1995,
    rating: 8.6,
    posterPath: '/191nKfP0ehp3uIvWqgPbFmI4lv9.jpg',
    backdropPath: '/i5H7zusQGsysGQ8i6P361Vnr0n2.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRwkHO8x1CxufDoUB1xFBmHgLfIXs58LnkRQ&s'
  },
  {
    id: 'prestige',
    tmdbId: 1124,
    title: 'The Prestige',
    aliases: ['prestige 2006'],
    genre: 'Drama / Mystery',
    actor: 'Hugh Jackman',
    year: 2006,
    rating: 8.5,
    posterPath: '/rOa94QOq3wbqKBHjSqL0WtPPJm1.jpg',
    backdropPath: '/z3br1ub7spqGMkxgjgJSdM4DC21.jpg',
    sceneUrl:
    'https://oyster.ignimgs.com/wordpress/stg.ign.com/2020/08/serkis-bowie-jackman-the-prestige.jpg'
  },
  {
    id: 'whiplash',
    tmdbId: 244786,
    title: 'Whiplash',
    aliases: ['whiplash 2014'],
    genre: 'Drama / Music',
    actor: 'Miles Teller',
    year: 2014,
    rating: 8.5,
    posterPath: '/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
    backdropPath: '/wbQa0EnWUyRzQ5d1pHLNRlmsCUP.jpg',
    sceneUrl:
    'https://www.slashfilm.com/img/gallery/how-damien-chazelle-cut-together-whiplashs-complicated-drum-solo-scene/putting-the-characters-in-the-edit-1675785747.jpg'
  },
  {
    id: 'la-la-land',
    tmdbId: 313369,
    title: 'La La Land',
    aliases: ['lalaland', 'la la land 2016'],
    genre: 'Romance / Musical',
    actor: 'Ryan Gosling',
    year: 2016,
    rating: 8.0,
    posterPath: '/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
    backdropPath: '/nlPCdZlHtRNcF6C9hzUH4ebmV1w.jpg',
    sceneUrl:
    'https://people.com/thmb/aYAYib6g4_h1GnDSDcEdhuFootg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(599x0:601x2)/lala-land1-7a5237daa7bb47b5a0dfd64e5cf0d989.jpg'
  },
  {
    id: 'mad-max',
    tmdbId: 76341,
    title: 'Mad Max: Fury Road',
    aliases: ['mad max fury road', 'fury road'],
    genre: 'Action / Adventure',
    actor: 'Tom Hardy',
    year: 2015,
    rating: 8.1,
    posterPath: '/hA2ple9q4qnwxp3hKVNhroipsir.jpg',
    backdropPath: '/uT895WNwm0aIJRtGizcQhrejWUo.jpg',
    sceneUrl:
    'https://static01.nyt.com/images/2015/05/13/multimedia/madmax-anatomy/madmax-anatomy-superJumbo.jpg'
  },
  {
    id: 'blade-runner',
    tmdbId: 335984,
    title: 'Blade Runner 2049',
    aliases: ['blade runner', 'blade runner 2049'],
    genre: 'Sci-Fi',
    actor: 'Ryan Gosling',
    year: 2017,
    rating: 8.0,
    posterPath: '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    backdropPath: '/mVr0UiqyltcfqxbAUcLl9zWL8ah.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmgW6zmE5X7CV1oAhIHAFTHYeX0B9pi0vU5Q&s'
  },
  {
    id: 'goodfellas',
    tmdbId: 769,
    title: 'Goodfellas',
    aliases: ['goodfellas 1990'],
    genre: 'Crime / Drama',
    actor: 'Robert De Niro',
    year: 1990,
    rating: 8.7,
    posterPath: '/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg',
    backdropPath: '/gILte6Zd7m1YneIr6MVhh30S9pr.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGSso0--SpM5Fo3Rz-lxQHBsteTaHXhDH6Q&s'
  },
  {
    id: 'there-will-be-blood',
    tmdbId: 7345,
    title: 'There Will Be Blood',
    aliases: ['there will be blood 2007'],
    genre: 'Drama',
    actor: 'Daniel Day-Lewis',
    year: 2007,
    rating: 8.2,
    posterPath: '/fa0RDkAlCec0STeMNAhPaF89q6U.jpg',
    backdropPath: '/9UAKA6ceZi6TgQwTAAMt7DWwYPI.jpg',
    sceneUrl:
    'https://cdn1.faroutmagazine.co.uk/uploads/1/2021/05/There-Will-Be-Blood.jpeg'
  },
  {
    id: 'get-out',
    tmdbId: 419430,
    title: 'Get Out',
    aliases: ['get out 2017'],
    genre: 'Horror / Thriller',
    actor: 'Daniel Kaluuya',
    year: 2017,
    rating: 7.7,
    posterPath: '/mE24wUCfjK8AoBBjaMjho7Rczr7.jpg',
    backdropPath: '/o8dPH0ZSIyyViP6rjRX1djwCUwI.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5CQ7WTVe0-nllUIG-XF5OUudlmasYpvNFOQ&s'
  },
  {
    id: 'knives-out',
    tmdbId: 546554,
    title: 'Knives Out',
    aliases: ['knives out 2019'],
    genre: 'Mystery / Comedy',
    actor: 'Daniel Craig',
    year: 2019,
    rating: 7.9,
    posterPath: '/pThyQovXQrw2m0s9x82twj48Jq4.jpg',
    backdropPath: '/4HWAQu28e2yaWrtupFPGFkdNU7V.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQuO5IA9Wb36LwHQ6gd46yCsKZs6G20midaA&s'
  },
  {
    id: 'everything-everywhere',
    tmdbId: 545611,
    title: 'Everything Everywhere All at Once',
    aliases: ['everything everywhere all at once', 'eeaao'],
    genre: 'Sci-Fi / Comedy',
    actor: 'Michelle Yeoh',
    year: 2022,
    rating: 7.8,
    posterPath: '/u68AjlvlutfEIcpmbYpKcdi09ut.jpg',
    backdropPath: '/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl1iwxvBOv11eFgZHn4Vd-f1Rji9dQkouIng&s'
  },
  {
    id: 'top-gun-maverick',
    tmdbId: 361743,
    title: 'Top Gun: Maverick',
    aliases: ['top gun maverick', 'top gun 2'],
    genre: 'Action / Drama',
    actor: 'Tom Cruise',
    year: 2022,
    rating: 8.3,
    posterPath: '/n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg',
    backdropPath: '/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqxsFhMmqfBDPcg0Y4mzRw4rCwg4oHTF24aQ&s'
  },
  {
    id: 'avengers-endgame',
    tmdbId: 299534,
    title: 'Avengers: Endgame',
    aliases: ['endgame', 'avengers endgame'],
    genre: 'Action / Sci-Fi',
    actor: 'Robert Downey Jr.',
    year: 2019,
    rating: 8.4,
    posterPath: '/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
    backdropPath: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    sceneUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqxsFhMmqfBDPcg0Y4mzRw4rCwg4oHTF24aQ&s'
  },
  {
    id: 'spider-man-noway-home',
    tmdbId: 634649,
    title: 'Spider-Man: No Way Home',
    aliases: ['spider man no way home', 'no way home'],
    genre: 'Action / Adventure',
    actor: 'Tom Holland',
    year: 2021,
    rating: 8.2,
    posterPath: '/tJ44EffQBBUMc61xa8QDz0oijQT.jpg',
    backdropPath: '/zD5v1E4joAzFvmAEytt7fM3ivyT.jpg',
    sceneUrl: 
    'https://static0.srcdn.com/wordpress/wp-content/uploads/2022/04/Tobey-Maguire-Andrew-Garfield-and-Tom-Hollands-Spider-Men-on-top-of-the-Statue-of-Liberty-in-Spider-Man-No-Way-Home.jpg'
  },
  {
    id: 'wolf-of-wall-street',
    tmdbId: 106646,
    title: 'The Wolf of Wall Street',
    aliases: ['wolf of wall street'],
    genre: 'Biography / Comedy',
    actor: 'Leonardo DiCaprio',
    year: 2013,
    rating: 8.2,
    posterPath: '/kW9LmvYHAaS9iA0tHmZVq8hQYoq.jpg',
    backdropPath: '/7Nwnmyzrtd0FkcRyPqmdzTPppQa.jpg',
  },
  {
    id: 'lion-king',
    tmdbId: 8587,
    title: 'The Lion King',
    aliases: ['lion king 1994'],
    genre: 'Animation / Family',
    actor: 'Matthew Broderick',
    year: 1994,
    rating: 8.5,
    posterPath: '/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg',
    backdropPath: '/q00H8EqULYSK74lgevMkhmGGLHn.jpg',
  },
  {
    id: 'toy-story',
    tmdbId: 862,
    title: 'Toy Story',
    aliases: ['toy story 1995'],
    genre: 'Animation / Family',
    actor: 'Tom Hanks',
    year: 1995,
    rating: 8.3,
    posterPath: '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
    backdropPath: '/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg',
  },
  {
    id: 'finding-nemo',
    tmdbId: 12,
    title: 'Finding Nemo',
    aliases: ['finding nemo 2003'],
    genre: 'Animation / Family',
    actor: 'Albert Brooks',
    year: 2003,
    rating: 8.2,
    posterPath: '/5lc6nQc0VhWFYFbNv016xze8Jvy.jpg',
    backdropPath: '/eCynaAOgYYiw5yN5lBwz3IxqvaW.jpg',
  },
  {
    id: 'up',
    tmdbId: 14160,
    title: 'Up',
    aliases: ['up 2009'],
    genre: 'Animation / Adventure',
    actor: 'Ed Asner',
    year: 2009,
    rating: 8.3,
    posterPath: '/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg',
    backdropPath: '/hGGC9gKo7CFE3fW07RA587e5kol.jpg',
  },
  {
    id: 'coco',
    tmdbId: 354912,
    title: 'Coco',
    aliases: ['coco 2017'],
    genre: 'Animation / Family',
    actor: 'Anthony Gonzalez',
    year: 2017,
    rating: 8.4,
    posterPath: '/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg',
    backdropPath: '/g7CHF8gTLGooTbP4GznIGwaqAGL.jpg',
  },
  {
    id: 'shrek',
    tmdbId: 808,
    title: 'Shrek',
    aliases: ['shrek 2001'],
    genre: 'Animation / Comedy',
    actor: 'Mike Myers',
    year: 2001,
    rating: 7.9,
    posterPath: '/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg',
    backdropPath: '/40Wtp7kMG6mZ4d5T1jfrd8qrvD4.jpg',
  },
]

/** @type {Movie[]} */
export const MOVIES = MOVIE_DATA.map((movie) => ({
  ...movie,
  poster: tmdbImage(movie.posterPath, 'w500'),
  scene: resolveSceneImage(movie.sceneUrl || movie.backdropPath, 'w1280'),
}))

export const MAX_ATTEMPTS = 5
