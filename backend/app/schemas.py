from typing import Optional

from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None


class Task(TaskBase):
    id: int
    completed: bool

    class Config:
        orm_mode = True
