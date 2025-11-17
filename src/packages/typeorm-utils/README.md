# @hng-sdk/typeorm-utils

A powerful TypeORM utilities package providing abstract model actions and helpers for building scalable NestJS applications with TypeORM.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
- [Advanced Usage](#advanced-usage)
- [Best Practices](#best-practices)

## Features

- **AbstractModelAction**: Base class providing CRUD operations for any TypeORM entity
- **Generic Type Support**: Full TypeScript generics support for type-safe operations
- **Pagination Helpers**: Built-in pagination with metadata
- **Transaction Support**: First-class transaction support for atomic operations
- **Flexible Querying**: Support for complex filters, relations, and ordering
- **Extensible**: Easy to extend with custom methods for specific use cases

## Installation

```bash
npm install @hng-sdk/typeorm-utils
# or
pnpm add @hng-sdk/typeorm-utils
# or
yarn add @hng-sdk/typeorm-utils
```

## Quick Start

### 1. Create Model Actions

Model actions are injectable services that extend `AbstractModelAction` for specific entities.

```typescript
// src/actions/model-actions.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractModelAction } from '@hng-sdk/typeorm-utils';
import { User, Course } from './entities';

@Injectable()
export class UserModelAction extends AbstractModelAction<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository, User);
  }
}

@Injectable()
export class CourseModelAction extends AbstractModelAction<Course> {
  constructor(
    @InjectRepository(Course)
    repository: Repository<Course>,
  ) {
    super(repository, Course);
  }

  // You can add custom methods specific to this entity
  async findPublishedCourses() {
    return this.list({
      filterRecordOptions: { is_published: true },
      order: { created_at: 'DESC' }
    });
  }
}
```

### 2. Register in Module

```typescript
// src/courses/courses.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModelAction, UserModelAction } from '../actions/model-actions';
import { Course, User } from './entities';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User])
  ],
  providers: [
    CourseModelAction,
    UserModelAction,
    CoursesService
  ],
  exports: [CourseModelAction, UserModelAction]
})
export class CoursesModule {}
```

### 3. Use in Services

```typescript
// src/courses/services/courses.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseModelAction, UserModelAction } from '../../actions/model-actions';
import { DataSource } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseModelAction: CourseModelAction,
    private readonly userModelAction: UserModelAction,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const { payload, paginationMeta } = await this.courseModelAction.list({
      filterRecordOptions: { is_published: true },
      paginationPayload: { page, limit },
      relations: { category: true },
      order: { created_at: 'DESC' }
    });

    return {
      courses: payload,
      meta: paginationMeta
    };
  }

  async findOne(id: string) {
    const course = await this.courseModelAction.get({
      identifierOptions: { id },
      relations: { category: true, modules: true }
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto, userId: string) {
    // Using transactions for atomic operations
    return await this.dataSource.transaction(async (manager) => {
      const user = await this.userModelAction.get({
        identifierOptions: { id: userId }
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const course = await this.courseModelAction.create({
        createPayload: {
          ...createCourseDto,
          creator_id: userId,
          creator_name: user.fullName,
          is_published: false
        },
        transactionOptions: {
          useTransaction: true,
          transaction: manager
        }
      });

      return course;
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.dataSource.transaction(async (manager) => {
      const existingCourse = await this.courseModelAction.get({
        identifierOptions: { id }
      });

      if (!existingCourse) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }

      const updatedCourse = await this.courseModelAction.update({
        identifierOptions: { id },
        updatePayload: updateCourseDto,
        transactionOptions: {
          useTransaction: true,
          transaction: manager
        }
      });

      return updatedCourse;
    });
  }

  async remove(id: string) {
    return await this.dataSource.transaction(async (manager) => {
      const course = await this.courseModelAction.get({
        identifierOptions: { id }
      });

      if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }

      await this.courseModelAction.delete({
        identifierOptions: { id },
        transactionOptions: {
          useTransaction: true,
          transaction: manager
        }
      });

      return { message: 'Course deleted successfully' };
    });
  }
}
```

## Core Concepts

### AbstractModelAction

The `AbstractModelAction` is a generic base class that provides standard CRUD operations for TypeORM entities.

**Constructor Parameters:**
- `repository`: TypeORM Repository instance
- `entityClass`: The entity class (for type reference)

**Type Parameter:**
- `T`: The entity type (e.g., `User`, `Course`)

### Generic Options

The package provides several generic option types for consistent API patterns:

- **CreateRecordGeneric**: Options for creating records
- **UpdateRecordGeneric**: Options for updating records
- **GetRecordGeneric**: Options for retrieving a single record
- **FindRecordGeneric**: Options for finding records with conditions
- **ListRecordGeneric**: Options for listing records with pagination
- **DeleteRecordGeneric**: Options for deleting records

## API Reference

### `create(options: CreateRecordGeneric<T>)`

Creates a new record in the database.

```typescript
const course = await courseModelAction.create({
  createPayload: {
    title: 'Introduction to TypeScript',
    description: 'Learn TypeScript from scratch',
    price: 49.99,
    is_published: false
  },
  transactionOptions: {
    useTransaction: true,
    transaction: manager // Optional: EntityManager from transaction
  }
});
```

**Parameters:**
- `createPayload`: Partial entity data to create
- `transactionOptions` (optional):
  - `useTransaction`: Boolean to enable transaction
  - `transaction`: EntityManager instance

**Returns:** Created entity

---

### `update(options: UpdateRecordGeneric<T>)`

Updates an existing record.

```typescript
const updatedCourse = await courseModelAction.update({
  identifierOptions: { id: 'course-uuid' },
  updatePayload: {
    title: 'Advanced TypeScript',
    price: 99.99
  },
  transactionOptions: {
    useTransaction: true,
    transaction: manager
  }
});
```

**Parameters:**
- `identifierOptions`: Criteria to find the record (e.g., `{ id: '...' }`)
- `updatePayload`: Partial entity data to update
- `transactionOptions` (optional): Transaction configuration

**Returns:** Updated entity

---

### `get(options: GetRecordGeneric<T>)`

Retrieves a single record by identifier.

```typescript
const course = await courseModelAction.get({
  identifierOptions: { id: 'course-uuid' },
  relations: {
    category: true,
    modules: {
      lessons: true
    }
  },
  queryOptions: {
    select: ['id', 'title', 'description', 'price']
  }
});
```

**Parameters:**
- `identifierOptions`: Criteria to find the record
- `relations` (optional): Relations to load
- `queryOptions` (optional): Additional query options (select, cache, etc.)

**Returns:** Entity or `null` if not found

---

### `find(options: FindRecordGeneric<T>)`

Finds records matching criteria.

```typescript
const courses = await courseModelAction.find({
  filterRecordOptions: {
    is_published: true,
    price: LessThan(100)
  },
  relations: { category: true },
  order: { created_at: 'DESC' },
  limit: 5
});
```

**Parameters:**
- `filterRecordOptions`: Where conditions
- `relations` (optional): Relations to load
- `order` (optional): Sorting configuration
- `limit` (optional): Maximum number of records

**Returns:** Array of entities

---

### `list(options: ListRecordGeneric<T>)`

Lists records with pagination support.

```typescript
const { payload, paginationMeta } = await courseModelAction.list({
  filterRecordOptions: {
    is_published: true,
    category_id: 'category-uuid'
  },
  paginationPayload: {
    page: 1,
    limit: 20
  },
  relations: { category: true, creator: true },
  order: { enrolled_count: 'DESC' }
});

console.log(paginationMeta);
// {
//   page: 1,
//   limit: 20,
//   total: 150,
//   total_pages: 8,
//   has_next: true,
//   has_previous: false
// }
```

**Parameters:**
- `filterRecordOptions` (optional): Where conditions (can be array for OR conditions)
- `paginationPayload` (optional): Pagination config `{ page, limit }`
- `relations` (optional): Relations to load
- `order` (optional): Sorting configuration

**Returns:** Object with:
- `payload`: Array of entities
- `paginationMeta`: Pagination information

---

### `delete(options: DeleteRecordGeneric<T>)`

Deletes a record from the database.

```typescript
await courseModelAction.delete({
  identifierOptions: { id: 'course-uuid' },
  transactionOptions: {
    useTransaction: true,
    transaction: manager
  }
});
```

**Parameters:**
- `identifierOptions`: Criteria to find the record
- `transactionOptions` (optional): Transaction configuration

**Returns:** `void`

---

### `save(entity: T | T[], options?)`

Saves one or more entities (creates or updates).

```typescript
const course = courseModelAction.repository.create({
  title: 'New Course',
  description: 'Description'
});

const savedCourse = await courseModelAction.save(course, {
  transactionOptions: {
    useTransaction: true,
    transaction: manager
  }
});
```

**Parameters:**
- `entity`: Single entity or array of entities
- `options` (optional): Save options including transaction config

**Returns:** Saved entity or entities

## Advanced Usage

### Custom Methods in Model Actions

Extend `AbstractModelAction` to add domain-specific methods:

```typescript
@Injectable()
export class CourseModelAction extends AbstractModelAction<Course> {
  constructor(
    @InjectRepository(Course)
    repository: Repository<Course>,
  ) {
    super(repository, Course);
  }

  /**
   * Find courses with randomization based on user region/country
   */
  async findRandomized(params: {
    filterRecordOptions?: Record<string, any>;
    userRegion?: string;
    userCountry?: string;
    page: number;
    limit: number;
    seed: number;
  }) {
    const { filterRecordOptions, userRegion, userCountry, page, limit, seed } = params;

    const normalizedSeed = (seed % 1000000) / 1000000;
    await this.repository.query(`SELECT setseed($1)`, [normalizedSeed]);

    const queryBuilder = this.repository
      .createQueryBuilder('course')
      .where('course.is_published = :isPublished', { isPublished: true });

    if (filterRecordOptions) {
      Object.entries(filterRecordOptions).forEach(([key, value]) => {
        queryBuilder.andWhere(`course.${key} = :${key}`, { [key]: value });
      });
    }

    // Add priority sorting based on user location
    if (userCountry && userRegion) {
      queryBuilder.addSelect(
        `CASE
          WHEN course.country = :userCountry AND course.region = :userRegion THEN 1
          WHEN course.country = :userCountry THEN 2
          WHEN course.region = :userRegion THEN 3
          ELSE 4
        END`,
        'priority'
      );
      queryBuilder.setParameter('userCountry', userCountry);
      queryBuilder.setParameter('userRegion', userRegion);
      queryBuilder.orderBy('priority', 'ASC');
    }

    queryBuilder.addOrderBy('RANDOM()', 'ASC');

    const [courses, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      payload: courses,
      paginationMeta: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
        has_next: page < Math.ceil(total / limit),
        has_previous: page > 1
      }
    };
  }
}
```

### Complex Filtering with OR Conditions

Use an array of filter objects for OR conditions:

```typescript
const courses = await courseModelAction.list({
  filterRecordOptions: [
    { title: ILike('%typescript%') },
    { description: ILike('%typescript%') },
    { about: ILike('%typescript%') }
  ],
  paginationPayload: { page: 1, limit: 10 }
});
```

### Nested Relations

Load deeply nested relations:

```typescript
const course = await courseModelAction.get({
  identifierOptions: { id: courseId },
  relations: {
    modules: {
      lessons: {
        user_progresses: {
          user_course: true
        }
      },
      assessments: true
    },
    category: true,
    reviews: true
  }
});
```

### Transaction Patterns

#### Pattern 1: Service-Level Transaction

```typescript
async createCourseWithModules(data: CreateCourseWithModulesDto) {
  return await this.dataSource.transaction(async (manager) => {
    // Create course
    const course = await this.courseModelAction.create({
      createPayload: data.course,
      transactionOptions: {
        useTransaction: true,
        transaction: manager
      }
    });

    // Create modules
    for (const moduleData of data.modules) {
      await this.moduleModelAction.create({
        createPayload: {
          ...moduleData,
          course_id: course.id
        },
        transactionOptions: {
          useTransaction: true,
          transaction: manager
        }
      });
    }

    return course;
  });
}
```

#### Pattern 2: Without Transactions

For simple read operations, transactions aren't necessary:

```typescript
async findPublishedCourses(page: number, limit: number) {
  return await this.courseModelAction.list({
    filterRecordOptions: { is_published: true },
    paginationPayload: { page, limit },
    relations: { category: true }
  });
}
```

### Multiple Database Support

If using multiple databases, specify the database name:

```typescript
@Injectable()
export class UserModelAction extends AbstractModelAction<User> {
  constructor(
    @InjectRepository(User, 'userDatabase') // Specify database name
    repository: Repository<User>,
  ) {
    super(repository, User);
  }
}
```

## Best Practices

### 1. Always Use Model Actions in Services

```typescript
// ✅ Good
@Injectable()
export class CoursesService {
  constructor(
    private readonly courseModelAction: CourseModelAction
  ) {}

  async findCourse(id: string) {
    return this.courseModelAction.get({ identifierOptions: { id } });
  }
}

// ❌ Bad - Don't inject repositories directly in services
@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}
}
```

### 2. Use Transactions for Multi-Step Operations

```typescript
// ✅ Good - Atomic operation
async enrollUserInCourse(userId: string, courseId: string) {
  return await this.dataSource.transaction(async (manager) => {
    const enrollment = await this.userCourseModelAction.create({
      createPayload: { user_id: userId, course_id: courseId },
      transactionOptions: { useTransaction: true, transaction: manager }
    });

    await this.courseModelAction.update({
      identifierOptions: { id: courseId },
      updatePayload: { enrolled_count: () => 'enrolled_count + 1' },
      transactionOptions: { useTransaction: true, transaction: manager }
    });

    return enrollment;
  });
}
```

### 3. Validate Before Delete

```typescript
// ✅ Good - Check existence first
async remove(id: string) {
  const course = await this.courseModelAction.get({
    identifierOptions: { id }
  });

  if (!course) {
    throw new NotFoundException(`Course with ID ${id} not found`);
  }

  await this.courseModelAction.delete({ identifierOptions: { id } });
}
```

### 4. Use Pagination for Large Datasets

```typescript
// ✅ Good - Paginated
async findAll(page: number = 1, limit: number = 20) {
  return this.courseModelAction.list({
    filterRecordOptions: { is_published: true },
    paginationPayload: { page, limit }
  });
}

// ❌ Bad - Loading everything
async findAll() {
  return this.courseModelAction.find({
    filterRecordOptions: { is_published: true }
  });
}
```

### 5. Select Only Needed Fields for Performance

```typescript
// ✅ Good - Select specific fields
const user = await this.userModelAction.get({
  identifierOptions: { id: userId },
  queryOptions: {
    select: ['id', 'fullName', 'email']
  }
});

// ❌ Bad - Loading all fields when not needed
const user = await this.userModelAction.get({
  identifierOptions: { id: userId }
});
```

### 6. Handle Relations Efficiently

```typescript
// ✅ Good - Only load needed relations
const course = await this.courseModelAction.get({
  identifierOptions: { id },
  relations: { category: true } // Only load category
});

// ❌ Bad - Loading unnecessary nested relations
const course = await this.courseModelAction.get({
  identifierOptions: { id },
  relations: {
    category: true,
    modules: { lessons: { materials: true } },
    reviews: { user: true }
  }
});
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
