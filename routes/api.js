const router = require('express').Router();
const Workout = require("../models/workout.js");

//Get Last Workout
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalWeight: { $sum: "$exercises.weight" },
                totalDuration: { $sum: "$exercises.duration" }
            }
        }])
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(400).json(err);
            });
        });
    //Create New Workout
    router.post('/api/workouts', ({ body }, res) => {
        console.log(body);

        Workout.create(body)
            .then(data => {
                res.json(data)
            }).catch(err => {
                res.json(err)
            })
    });

    //Update Existing Workout
    router.put('/api/workouts/:id', ({ body, params }, res) => {
        Workout.findOneAndUpdate(
            { _id: params.id }, { $push: { exercises: body } }, { new: true }
        ).then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
    });

    //Get Workouts in Range
    router.get('/api/workouts/range', (req, res) => {

        Workout.aggregate([
            {
                $addFields: {
                    totalWeight: { $sum: "$exercises.weight" },
                    totalDuration: { $sum: "$exercises.duration" }
                }
            },
            { $sort: { 'day': -1 } }, { $limit: 7 }])
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    module.exports = router;