const game = {
    id: 1, // game id
    title: 'Spin and Win', // game title
    description: 'Spin and Win', // game description
    type: 'spin-and-win', // game type [mix-and-match/spin-and-win]
    start_date: '2019-01-01 00:00:00', // start date game to play
    end_date: '2019-01-01 23:59:59', // end date game to play
    token_currency: { // token currency to play game (get from gami:system_service:system_config)
        id: 6, // system_config id
        label: 'token', // system_config value label
    },
    token_charge: 1, // charge per game
    config: { // json
        menu: {
            background_music: require('./rsc/Prizefighter.mp3'),
            start_sound: require('./rsc/Start_button.mp3'),

            background_image: require('./rsc/D11-Landing-image-v2.jpg'), // game landing background
            start_button: require('./rsc/D11-Button-image_Play_529x130.png'), // start button icon
            how_to_play_button: require('./rsc/D11-Button-image_How-to-play_529x130.png'), // how to play icon
            prizes_button: require('./rsc/D11-Button-image_Prize_529x130.png'), // prizes icon
            how_to_play_slider: [ // game isntruction/step images
                require('./rsc/D11-How-To-Play.jpg'),
            ],
            prize_slider: [ // prizes information images
                require('./rsc/D11-prize-image.jpg'),
            ],
        },
        game: {
            background_music: require('./rsc/Prizefighter.mp3'),
            fail_sound: require('./rsc/Bomb.mp3'),
            click_sound: require('./rsc/click_sound.mp3'),
            flip_sound: require('./rsc/flip.mp3'),
            flip_corret_sound: require('./rsc/flip_correct.mp3'),
            flip_wrong_sound: require('./rsc/flip_wrong.mp3'),
            winner_sound: require('./rsc/xmas_winner.mp3'),
            loser_sound: require('./rsc/xmas_loser.mp3'),

            background_image: require('./rsc/D11-Game-background.jpg'), // game playing background
            card_image: [ // segment images
                require('./rsc/D11-Brand_Image_Au-Fairy_300x300.jpg'),
                require('./rsc/D11-Brand_Image_COSRX_300x300.jpg'),
                require('./rsc/D11-Brand_Image_Eucerin_300x300.jpg'),
                require('./rsc/D11-Brand_Image_innisfree_300x300.jpg'),
                require('./rsc/D11-Brand_Image_Laneige_300x300.jpg'),
                require('./rsc/D11-Brand_Image_Loreal_300x300.jpg'),
                require('./rsc/D11-Brand_Image_Maybelline_300x300.jpg'),
                require('./rsc/D11-Brand_Image_MIRAE_300x300.jpg'),
                require('./rsc/D11-Brand_Image_NIVEA_300x300.jpg'),
                require('./rsc/D11-Brand_Image_NYX_300x300.jpg'),
                require('./rsc/D11-Brand_Image_Ogawa_300x300.jpg'),
                require('./rsc/D11-Brand_Image_Watashi_300x300.jpg'),
            ],
            card_cover: require('./rsc/D11-Brand_Cover-Image_300x300.jpg'),
            result_actions: {
                menu_button: require('./rsc/D11-Button-Image_Menu_243x332.png'),
                share_button: require('./rsc/D11-Button-Image_Share_243x332.png'),
                replay_button: require('./rsc/D11-Button-Image_Replay_243x332.png'),
            },
        },
    },
    rules_id: 1, // rules id from rules table // gaming rules object
    rewards: [ // add according reward local table // json
        {
            reward_local_id: 1, // reward_local table id // have reward rules //  reward_local object id
        },
        {
            reward_local_id: 2,
        },
    ],
    inactive: false, // game status
    created_at: '2019-10-10T06:53:19.217Z', // created time
    created_by: null, // creator id
    updated_at: null, // update time
    updated_by: null, // updater id
};

// rule for game
// const rule = {
//     id: 1,
//     model_table: game_setup, //game setup table name
//     model_id: 1, //game setup id
//     start_date: "2019-01-01 00:00:00",
//     end_date: "2019-01-01 23:59:59",
//     rules: {
//         time_limit: 60, //in secs
//     },
//     remarks: "Rules for 612 game", //remark
//     inactive: false, // status
//     created_at: 1, //creator id
//     created_by: "2019-01-01 00:00:00", //created date
//     updated_at: 1, //updater id
//     updated_by: "2019-01-01 00:00:00", //updated date
// }

// rule for gifts/reward
// const rule = {
//     id: 2,
//     model_table: reward_local, //game setup table name
//     model_id: 1, //game setup id
//     start_date: "2019-01-01 00:00:00",
//     end_date: "2019-01-01 23:59:59",
//     rules: {
//         min: 100, //probability to get this item
//         max: 200, //probability to get this item
//         is_platinum_member_only: true, //bool
//         is_gold_member_only: true, //bool
//         is_gnp_only: true, //bool
//         is_customer_only: true, //bool
//         daily_limit: 1, //int
//         limit_per_user: 1, //int
//     },
//     remarks: "Rules for 612 game", //remark
//     inactive: false; // status
//     created_at: 1, //creator id
//     created_by: "2019-01-01 00:00:00", //created date
//     updated_at: 1, //updater id
//     updated_by: "2019-01-01 00:00:00", //updated date
// }

export default game;
