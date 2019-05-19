const request = require('supertest');
const mongoose = require('mongoose');
const {User} = require('../src/components/users/model');
const {Model} = require('../src/components/models/model');
const app = require('../app');

beforeAll(async () => {
  const {users} = mongoose.connection.collections
  await users.deleteMany();
})

describe('User Write', () => {
  test('Creates User', async () => {
    // const response = await request(app)
    // .post('/v0/users')
    // .send({
    //   email: 'test_write@test.com',
    //   name: 'Write Test',
    //   password: '123456'
    // })

    await testUser.save();
    testUser.isNew
  })
});

describe('User Read', () => {
  let testUser;
  before(async () => {
    testUser = new User({
      email: 'test_read@test.com',
      name: 'Read Test',
      password: '123456'
    });
    await testUser.save();
  })
  test('Reads User', async () => {
    let user = await User.findOne({name: 'Read Test'})
      try {
        // _id is not string it is object.
        assert(testUser._id.toString() === user._id.toString());
      }
      catch(error) {
      }
    })
});

describe('User Delete', () => {
  let testUser;
  let testModel;
  beforeEach(async () => {
    testUser = new User({
      email: 'test_deleted@test.com',
      name: 'Delete Test',
      password: '123456'
    })
    testModel = new Model({
      name: 'Delete Model',
      category: 'food',
      prefabLinks: {
        ios: 'testIosLink',
        android: 'testAndroidLink'
      },
      imageUrl: 'testImageUrl',
      userId: testUser 
    })
    await Promise.all([testUser.save(), testModel.save()])
  });

  test('Deletes User with Instance', async () => {
    await testUser.remove();
    let user = await User.findById(testUser._id)
    let model = await Model.findById(testModel._id)
      try{
        assert(!user && !model)
      } 
      catch(error){
        assert(false);
      }
    })
  test('Deletes User with Model', async () => {
    await User.remove({_id: testUser._id})
    let user = await User.findOne(testUser);
    try{
      assert(!user)
    } 
    catch(error){
      assert(false)
    }
  })
});

describe('User Update', () => {
  let testUser;
  beforeEach(async () => {
    testUser = new User({
      email: 'test_update@test.com',
      name: 'Update Test',
      password: '123456'
    });
    await testUser.save();
  })
  test('Update User with Instance', async () => {
    testUser.email = 'test_update_1@test.com';
    await testUser.save();
    const user = await User.findOne({email: 'test_update_1@test.com'});
    assert(user);
  });
  test('Update User with Model Operator', async () => {
    await User.updateOne(
      {_id: testUser._id},
      {$set: 
        {email: 'test_update_2@test.com'}
      });
    const user = await User.findOne({email: 'test_update_2@test.com'});
    assert(user);
  });
})

describe('User Virtual types', () => {
  let testUser;
  let testModel;
  before(async () => {
    testUser = new User({
      email: 'test_virtual_types@test.com',
      name: 'Virtual Types Test',
      password: '123456',
      tokens: [
        {
          access: 'accessTest_1',
          token: 'tokenTest_1',
        },
        {
          access: 'accessTest_2',
          token: 'tokenTest_2',
        },
        {
          access: 'accessTest_3',
          token: 'tokenTest_3',
        }
      ]
    });
    testModel = new Model({
      name: 'Virtual Model',
      category: 'food',
      prefabLinks: {
        ios: 'testIosLink',
        android: 'testAndroidLink'
      },
      imageUrl: 'testImageUrl',
      userId: testUser 
    })
    await Promise.all([testUser.save(), testModel.save()])
  });

  test('Get Token Count', async () => {
   const user = await User.findById(testUser._id);
    assert(user.tokenCount === testUser.tokens.length)
  })
  test('Get Models', async () => {
   const user = await User.findById(testUser._id);
   const models = await user.models;
   assert(models);
  })
})

describe('User Association', () => {
  let testUser;
  let testModel;
  before(async () => {
    testUser = new User({
      email: 'test_associations@test.com',
      name: 'Associations test',
      password: '123456',
    });
    testModel = new Model({
      name: 'Association Model',
      category: 'food',
      prefabLinks: {
        ios: 'testIosLink',
        android: 'testAndroidLink'
      },
      imageUrl: 'testImageUrl',
      userId: testUser 
    })
    await Promise.all([testUser.save(), testModel.save()])
  })

  // it('User Model and User', async () => {
  //   const user = await User.findById(testUser._id);
  // })
})